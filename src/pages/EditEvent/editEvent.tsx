/* eslint-disable react/prop-types */
import {
  Box,
  Container,
  Divider,
  Flex,
  FormControl,
  ScrollView,
  Spacer,
  Text,
  Select as SelectBase,
  WarningOutlineIcon,
  Spinner,
  useToast,
  Button,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { Marker } from "react-native-maps";
import { ButtonSimple } from "../../components/buttons";
import { Input, Select } from "../../components/input";
import { InputWithLabelDate } from "../../components/inputTips";
import getAdressByCep from "../../service/api/cepGetAdress";
import getCordenades from "../../service/api/getCordenades";
import { Map } from "./style";
import { dataFormatBR } from "../../functions/formats";
import createEvent from "../../service/api/createEvent";
import { useAutenticacaoContext } from "../../contexts/autenticacao";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import updateEvent from "../../service/api/updateEvent";

type cordeantesProps = {
  latitude: number;
  longitude: number;
};

type requestCreate = {
  id: number;
  name: string;
  date: string;
  maxGuests: string;
  address: string;
  city: string;
  state: string;
  postalCod: string;
  valueParty: string;
  usersId: number;
  cordenates: any;
  time: string | number;
  codInvite: number;
  categorias: Array<{ title: string | undefined }>;
  obs: string;
};

const states = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goías" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraíma" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

const Edit = () => {
  const navigation = useNavigation();
  const mapRef = useRef<null>(null);
  const [cordenates, setCordenates] = useState<cordeantesProps>({} as cordeantesProps);
  const parans: any = useRoute();
  const [form, setForm] = useState<requestCreate>(parans.params);
  const [submit, setSubmite] = useState(false);
  const [load, setLoad] = useState(false);
  const [categoria, setCategoria] = useState<string>();
  const { logadoInfo, setLoadFull, logof } = useAutenticacaoContext();
  const toast = useToast();

  useEffect(() => {
    const newRegion = {
      latitude: Number(parans.params.cordenades ? JSON.parse(parans.params.cordenades).latitude : 0),
      longitude: Number(parans.params.cordenades ? JSON.parse(parans.params.cordenades).longitude : 0),
      latitudeDelta: 0.0001922,
      longitudeDelta: 0.001421,
    };
    setCordenates({ latitude: newRegion.latitude, longitude: newRegion.longitude });
    setForm((props) => ({
      ...props,
      cordenates: JSON.stringify({ latitude: newRegion.latitude, longitude: newRegion.longitude }),
    }));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    mapRef?.current.animateToRegion(newRegion, 5 * 1000);
  }, []);

  async function loadLocalozation(e: any) {
    try {
      setLoad(true);
      const cords: any = await getCordenades(e);
      const enders = await getAdressByCep(e);
      const { bairro, uf, logradouro, localidade } = enders.data;
      setLoad(false);
      if (!enders)
        return toast.show({
          title: "Cep não encontrado",
          placement: "bottom",
        });
      if (cords.data.length === 0)
        return toast.show({
          title: "Cep não encontrado",
          placement: "bottom",
        });

      setForm((props) => ({
        ...props,
        address: logradouro,
        city: localidade,
        state: uf,
        cordenates: JSON.stringify({ latitude: cords.data[0].lat, longitude: cords.data[0].lon }),
        usersId: logadoInfo.id,
      }));

      const newRegion = {
        latitude: Number(cords.data[0].lat),
        longitude: Number(cords.data[0].lon),
        latitudeDelta: 0.0001922,
        longitudeDelta: 0.001421,
      };
      setCordenates({ latitude: newRegion.latitude, longitude: newRegion.longitude });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      mapRef.current.animateToRegion(newRegion, 5 * 1000);
    } catch (error) {
      setLoad(false);
    }
  }

  async function updateEventFun() {
    setSubmite(true);
    if (Object.keys(form).length < 10)
      return toast.show({
        title: "Preencha os Todos os Campos",
        placement: "bottom",
      });
    setLoad(true);

    try {
      await updateEvent(form);

      setLoad(false);
      toast.show({
        title: "Atualizado com sucesso",
        placement: "bottom",
      });
      navigation.navigate("home");
    } catch (error) {
      setLoad(false);
      toast.show({
        title: "Erro Inesperado",
        placement: "bottom",
      });
    }
  }

  function removeitemCategorias(e: number) {
    const tempCategoris = form.categorias;
    tempCategoris.splice(e, 1);
    setForm((props) => ({ ...props, categorias: tempCategoris }));
  }

  return (
    <ScrollView>
      <Box marginTop={10} alignItems="center" pb={10}>
        <Text color="primary.50" fontFamily="Roboto_400Regular" bold fontSize="2xl" mb="4">
          Crie seu Evento.
        </Text>
        <Divider my="2" width="90%" />
        <FormControl isRequired width="90%" mb={5} isInvalid={!form.name && submit ? true : false}>
          <FormControl.Label
            _text={{
              fontSize: "sm",
              fontWeight: "bold",
              color: "primary.50",
            }}
          >
            Nome Do Evento
          </FormControl.Label>
          <Input
            onChangeText={(e) => setForm((props) => ({ ...props, name: e }))}
            size="md"
            type="text"
            placeholder="ex: Casamento"
            value={form.name}
            maxLength={30}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Nome não pode ser vazio
          </FormControl.ErrorMessage>
        </FormControl>
        <Flex direction="row" width="90%" mb={5}>
          <FormControl isRequired flex={1} mr={3} isInvalid={!form.date && submit ? true : false}>
            <FormControl.Label
              _text={{
                fontSize: "sm",
                fontWeight: "bold",
                color: "primary.50",
              }}
            >
              Data
            </FormControl.Label>
            <InputWithLabelDate
              value={form.date}
              onChangeDate={(e) => setForm((props) => ({ ...props, date: e }))}
              type="date"
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Data não pode ser vazio
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired flex={2} isInvalid={!form.maxGuests && submit ? true : false}>
            <FormControl.Label
              _text={{
                fontSize: "sm",
                fontWeight: "bold",
                color: "primary.50",
              }}
            >
              Convidados
            </FormControl.Label>
            <Input
              onChangeText={(e) => setForm((props) => ({ ...props, maxGuests: e }))}
              size="md"
              type="text"
              placeholder="ex: 100"
              value={form.maxGuests.toString()}
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Convidados não pode ser vazio
            </FormControl.ErrorMessage>
          </FormControl>
        </Flex>
        <Flex direction="row" width="90%" justifyContent="center" alignItems="center" mb={5}>
          <Input
            mr={2}
            flex={2}
            onChangeText={(e) => setCategoria(e)}
            value={categoria}
            size="md"
            type="text"
            placeholder="add categoria"
          />

          <ButtonSimple
            size="md"
            flex={1}
            onPress={() => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              setForm((props) => ({
                ...props,
                // eslint-disable-next-line no-unsafe-optional-chaining
                categorias: props?.categorias ? [...props?.categorias, { title: categoria }] : [{ title: categoria }],
              }));
              setCategoria("");
            }}
          >
            ADD
          </ButtonSimple>
        </Flex>
        <ScrollView w="90%" maxH="200px" _contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}>
          {form?.categorias?.map((e, i) => (
            <Button
              onPress={() => removeitemCategorias(i)}
              key={i}
              margin={1}
              bg="primary.500"
              borderRadius={5}
              p={2}
              _text={{ color: "muted.50" }}
            >
              {e.title}
            </Button>
          ))}
        </ScrollView>
        <FormControl isRequired width="90%" mb={5} isInvalid={!form.obs && submit ? true : false}>
          <FormControl.Label
            _text={{
              fontSize: "sm",
              fontWeight: "bold",
              color: "primary.50",
            }}
          >
            Observação
          </FormControl.Label>
          <Input
            multiline
            value={form.obs}
            h={20}
            onChangeText={(e) => setForm((props) => ({ ...props, obs: e }))}
            size="md"
            type="text"
            placeholder="ex: Casamento"
            maxLength={200}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Nome não pode ser vazio
          </FormControl.ErrorMessage>
        </FormControl>
        <Flex direction="row" width="90%" mb={5}>
          <FormControl isRequired flex={1} mr={3} isInvalid={!form.date && submit ? true : false}>
            <FormControl.Label
              _text={{
                fontSize: "sm",
                fontWeight: "bold",
                color: "primary.50",
              }}
            >
              Horário
            </FormControl.Label>
            <InputWithLabelDate
              value={form.time}
              onChangeDate={(e) => setForm((props) => ({ ...props, time: e }))}
              type="time"
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Data não pode ser vazio
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired flex={2} width="90%" mb={5} isInvalid={!form.postalCod && submit ? true : false}>
            <FormControl.Label
              _text={{
                fontSize: "sm",
                fontWeight: "bold",
                color: "primary.50",
              }}
            >
              Cep
            </FormControl.Label>
            <Input
              onChangeText={(e) => setForm((props) => ({ ...props, postalCod: e }))}
              value={form.postalCod.toString()}
              size="md"
              type="text"
              keyboardType="numeric"
              placeholder="ex: 51330590"
              onBlur={() => loadLocalozation(form.postalCod)}
              rightElement={load ? <Spinner mr={5} color="primary.200" /> : undefined}
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Cep não pode ser vazio
            </FormControl.ErrorMessage>
          </FormControl>
        </Flex>
        <FormControl isRequired width="90%" mb={5} isInvalid={!form.address && submit ? true : false}>
          <FormControl.Label
            _text={{
              fontSize: "sm",
              fontWeight: "bold",
              color: "primary.50",
            }}
          >
            Endereço
          </FormControl.Label>
          <Input
            onChangeText={(e) => setForm((props) => ({ ...props, address: e }))}
            size="md"
            type="text"
            placeholder="ex: rua sarambi n:127"
            value={form.address}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Endereço não pode ser vazio
          </FormControl.ErrorMessage>
        </FormControl>
        <Flex direction="row" width="90%" mb={5}>
          <FormControl isRequired flex={1} mr={3} isInvalid={!form.city && submit ? true : false}>
            <FormControl.Label
              _text={{
                fontSize: "sm",
                fontWeight: "bold",
                color: "primary.50",
              }}
            >
              Cidade
            </FormControl.Label>
            <Input
              onChangeText={(e) => setForm((props) => ({ ...props, city: e }))}
              size="md"
              type="text"
              placeholder="ex: Recife"
              value={form.city}
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Cidade não pode ser vazio
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired flex={2} isInvalid={!form.state && submit ? true : false}>
            <FormControl.Label
              _text={{
                fontSize: "sm",
                fontWeight: "bold",
                color: "primary.50",
              }}
            >
              UF
            </FormControl.Label>
            <Select
              selectedValue={form.state}
              onValueChange={(e) => setForm((props) => ({ ...props, state: e }))}
              itens={states}
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              UF não pode ser vazio
            </FormControl.ErrorMessage>
          </FormControl>
        </Flex>

        <Map ref={mapRef} provider="google">
          {Object.keys(cordenates).length > 0 && (
            <Marker
              onDragEnd={(e) =>
                setForm((props) => ({ ...props, cordenates: JSON.stringify(e.nativeEvent.coordinate) }))
              }
              draggable
              key={1}
              coordinate={cordenates}
              title="teste"
              description="testando"
            />
          )}
        </Map>
        <ButtonSimple isLoading={load} isLoadingText="Submitting" onPress={updateEventFun} mt={6}>
          Atualizar
        </ButtonSimple>
      </Box>
    </ScrollView>
  );
};

export default Edit;
