import React, { useEffect, useState } from "react";
import {
  NativeBaseProvider,
  Box,
  Text,
  Pressable,
  Heading,
  IconButton,
  Icon,
  HStack,
  Avatar,
  VStack,
  Spacer,
  Center,
  Button,
  useToast,
  Flex,
  useDisclose,
  Actionsheet,
  Modal as Mod,
  FormControl,
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { MaterialIcons, Ionicons, Entypo, AntDesign, FontAwesome } from "@expo/vector-icons";
import Tab from "../../components/tab";
import { useNavigation, useRoute } from "@react-navigation/native";
import getAllWaiting from "../../service/api/getAllWatingList";
import { useAutenticacaoContext } from "../../contexts/autenticacao";
import deleteWaitingList from "../../service/api/deleteWaitingList";
import postConvidados from "../../service/api/postMemberConvidados";
import getAllConvidados from "../../service/api/getAlConvidados";
import { Seach, Select } from "../../components/input";
import Modal from "../../components/modal";
import { ButtonSimple } from "../../components/buttons";
import putConvidados from "../../service/api/putConvidados";
import { ItemClick } from "native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types";

type requestModal = {
  idWaitingList?: number;
  nome?: string;
  email?: string;
  img?: string;
  usersId: number;
  idConvite?: number;
  permissao?: number;
  categoria?: string;
};

type filterProps = {
  todos?: boolean;
  aprovados?: boolean;
  aguardando?: boolean;
};

type propsSelectModal = {
  permission: string;
  category: string;
  id: number;
};

const Lista: React.FC = () => {
  const { logadoInfo } = useAutenticacaoContext();
  const parans: any = useRoute();
  const toast = useToast();
  const [modal, setModal] = useState(false);
  const [selectModalUserUpdate, setSelectModalUserUpdate] = useState<propsSelectModal>({} as propsSelectModal);
  const [listDataWating, setListDataWating] = useState<Array<requestModal>>([]);
  const [allList, setAllList] = useState<Array<requestModal>>([]);
  const [load, setLoad] = useState(false);
  const [seach, setSeach] = useState<string>("");
  const [filter, setFilter] = useState<filterProps>({} as filterProps);
  const { isOpen, onOpen, onClose } = useDisclose();

  useEffect(() => {
    getAllWatingApi();
  }, []);

  const valueAdmin = [
    { label: "admin", value: "2" },
    { label: "operador", value: "1" },
    { label: "comun", value: "0" },
  ];

  function getLabelCategory() {
    const result: Array<{ label: string; value: string }> = parans.params.categorias.map((e: any) => {
      return { label: e.title, value: e.title };
    });

    return result;
  }

  async function getAllWatingApi() {
    setLoad(true);
    try {
      if (!parans.params.id) return;
      const res = await getAllWaiting(parans.params.id);
      const res2 = await getAllConvidados(parans.params.id);
      setListDataWating([...res.data.result, ...res2.data.result]);
      setAllList([...res.data.result, ...res2.data.result]);
      setLoad(false);
    } catch (error) {
      setLoad(false);
    }
  }

  async function postConvidadosApi(item: requestModal) {
    const res = await postConvidados({
      usersId: item?.usersId,
      id_party: parans.params.id,
      categoria: "",
      permissao: 0,
    });
    await getAllWatingApi();
    toast.show({
      title: item.nome + " Aceito",
      placement: "top",
    });
  }

  function dataFilter() {
    if (seach) {
      return listDataWating.filter((e) => e.nome?.includes(seach) || e.email?.includes(seach));
    }
    if (filter.aguardando) {
      return listDataWating
        .filter((e) => e.idWaitingList)
        .filter((e) => e.nome?.includes(seach) || e.email?.includes(seach));
    }

    if (filter.aprovados) {
      return listDataWating
        .filter((e) => e.idConvite)
        .filter((e) => e.nome?.includes(seach) || e.email?.includes(seach));
    }
    return listDataWating;
  }

  async function deleteWaitingListApi(data: { item: requestModal }) {
    try {
      if (!logadoInfo?.id)
        return toast.show({
          title: "Erro Inesperado",
          placement: "top",
        });
      const result = await deleteWaitingList(data.item.usersId, parans.params.id, true);
      await getAllWatingApi();
      toast.show({
        title: "Usuário removido !",
        placement: "top",
      });
    } catch (error) {
      toast.show({
        title: "error com o host",
        placement: "top",
      });
    }
  }

  const renderItem = ({ item }: { item: requestModal }) => (
    <Box>
      <Pressable
        onPress={() => console.log("You touched me")}
        _dark={{
          bg: "coolGray.800",
        }}
        _light={{
          bg: "white",
        }}
      >
        <Box pl="4" pr="5" py="2">
          <HStack alignItems="center" space={3}>
            <Avatar
              size="48px"
              source={{
                uri: item.img,
              }}
            />
            <VStack maxW="70%">
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
                bold
              >
                {item.nome}
              </Text>
              <Text
                color="coolGray.600"
                numberOfLines={1}
                ellipsizeMode="tail"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                {item.email}
              </Text>
            </VStack>
            <Spacer />
            {item.idWaitingList ? (
              <Icon color="warning.400" as={AntDesign} name="exclamationcircle" size="2xl" />
            ) : (
              <Icon color="tertiary.400" as={AntDesign} name="checkcircle" size="2xl" />
            )}
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );

  async function saveCategoryEndPermision() {
    try {
      setLoad(true);
      await putConvidados({
        id: selectModalUserUpdate.id,
        categoria: selectModalUserUpdate.category,
        permissao: parseInt(selectModalUserUpdate.permission),
      });
      await getAllWatingApi();
      setLoad(false);
      toast.show({
        title: "Salvo",
        placement: "top",
      });
    } catch (error) {
      setLoad(false);
      toast.show({
        title: "erro",
        placement: "top",
      });
    }
  }
  const renderHiddenItem = (data: { item: requestModal }, rowMap: any) => (
    <HStack flex="1" pl="2">
      {data.item.idConvite ? (
        <Pressable
          onPress={() => {
            setModal(true);
            setSelectModalUserUpdate({
              category: data?.item?.categoria || "",
              permission: data?.item?.permissao + "" || "0",
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              id: data?.item?.idConvite,
            });
          }}
          w="70"
          ml="auto"
          bg="coolGray.200"
          justifyContent="center"
          _pressed={{
            opacity: 0.5,
          }}
        >
          <VStack alignItems="center" space={2}>
            <Icon as={<Entypo name="dots-three-horizontal" />} size="lg" color="coolGray.800" />
          </VStack>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => postConvidadosApi(data.item)}
          w="70"
          ml="auto"
          bg="success.500"
          justifyContent="center"
          _pressed={{
            opacity: 0.5,
          }}
        >
          <VStack alignItems="center" space={2}>
            <Icon as={<Entypo name="save" />} color="white" size="lg" />
          </VStack>
        </Pressable>
      )}

      <Pressable
        w="70"
        bg="red.500"
        justifyContent="center"
        onPress={() => deleteWaitingListApi(data)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon as={<MaterialIcons name="delete" />} color="white" size="lg" />
        </VStack>
      </Pressable>
    </HStack>
  );

  function ActionsheetElement() {
    return (
      <Center>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Actionsheet.Item
              isDisabled={filter.todos}
              onPress={() => {
                setFilter({ aprovados: false, aguardando: false, todos: true });
                onClose();
              }}
            >
              Todos
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={() => {
                setFilter({ aprovados: true, aguardando: false, todos: false });
                onClose();
              }}
              isDisabled={filter.aprovados}
            >
              Aprovados
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={() => {
                setFilter({ aprovados: false, aguardando: true, todos: false });
                onClose();
              }}
              isDisabled={filter.aguardando}
            >
              Aguardando
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </Center>
    );
  }

  return (
    <>
      <Modal isOpen={modal} onClose={setModal}>
        <Mod.Header>Config</Mod.Header>
        <Mod.Body>
          <FormControl>
            <FormControl.Label
              _text={{
                fontSize: "sm",
                fontWeight: "bold",
                color: "primary.50",
              }}
            >
              Permissão
            </FormControl.Label>
            <Select
              placeholder="Escolha"
              itens={valueAdmin}
              onValueChange={(value) => setSelectModalUserUpdate((props) => ({ ...props, permission: value }))}
              selectedValue={selectModalUserUpdate.permission}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{
                fontSize: "sm",
                fontWeight: "bold",
                color: "primary.50",
              }}
            >
              Categorias
            </FormControl.Label>
            <Select
              placeholder="Escolha"
              onValueChange={(value) => setSelectModalUserUpdate((props) => ({ ...props, category: value }))}
              selectedValue={selectModalUserUpdate.category}
              itens={getLabelCategory()}
            />
          </FormControl>
          <ButtonSimple isLoading={load} w="100%" mt={6} onPress={saveCategoryEndPermision}>
            Salvar
          </ButtonSimple>
        </Mod.Body>
      </Modal>
      <Box bg="white" flex="1" pt="8">
        <ActionsheetElement />
        <Flex direction="row" pl="5" pb="7">
          <Box flex={3}>
            <Seach
              InputLeftElement={<Icon as={<MaterialIcons name="search" />} size={5} ml="4" color="muted.400" />}
              placeholder="Procurar"
              onChangeText={setSeach}
            />
          </Box>
          <Box flex={1} justifyContent="center" alignItems="center">
            <Pressable
              onPress={onOpen}
              _pressed={{
                opacity: 0.5,
              }}
            >
              <Icon as={<FontAwesome name="filter" />} size="3xl" color="muted.500" />
            </Pressable>
          </Box>
        </Flex>
        <SwipeListView
          data={dataFilter()}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-148}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          refreshing={load}
          onRefresh={getAllWatingApi}
        />
      </Box>
    </>
  );
};

export default Lista;
