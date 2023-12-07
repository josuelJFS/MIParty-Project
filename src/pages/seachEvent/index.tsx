import { Box, Flex, FormControl, Icon, Modal, useToast } from "native-base";
import { Input } from "../../components/input";
import React, { useState } from "react";
import { ButtonSimple } from "../../components/buttons";
import { FontAwesome5 } from "@expo/vector-icons";
import ListEvent from "../../components/lists";
import getPartyForCod from "../../service/api/seachPartyForCod";
import insertWaitingList from "../../service/api/postWaitingList";
import deleteWaitingList from "../../service/api/deleteWaitingList";
import { useAutenticacaoContext } from "../../contexts/autenticacao";

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
  cordenades: { latitude: any; longitude: any };
  time: string | number;
  codInvite: string;
  categorias: Array<{ title: string }>;
};

const SeachEvent: React.FC = () => {
  const { logadoInfo } = useAutenticacaoContext();
  const [data, setData] = useState<Array<requestCreate>>([]);
  const [codInvite, setCodInvite] = useState<string>();
  const toast = useToast();
  const [load, setLoad] = useState(false);
  const [isParticiping, setIsPArticiping] = useState(false);

  async function getPartyForCodApi() {
    try {
      if (!codInvite) {
        return toast.show({
          title: "código nao pode ser vazio!",
          placement: "top",
        });
      }
      setLoad(true);
      const result = await getPartyForCod(codInvite, logadoInfo.id);
      setLoad(false);
      setIsPArticiping(result.data.isParticiping);
      if (result.data.status === true) {
        setData(result.data.result);
      } else {
        console.log("aqi");
        toast.show({
          title: "código não Encontrado!",
        });
      }
    } catch (error) {
      setLoad(false);

      toast.show({
        title: "erro com o host",
        placement: "bottom",
      });
    }
  }

  async function insertWaitingListApi() {
    try {
      const result = await insertWaitingList({ idParty: data[0].id, usersId: logadoInfo.id });
      await getPartyForCodApi();
      toast.show({
        title: "Você pediu para participar aguarde o adminstrador aceita-lo",
        placement: "top",
      });
    } catch (error) {
      toast.show({
        title: "error",
        placement: "top",
      });
    }
  }

  async function deleteWaitingListApi() {
    try {
      if (!logadoInfo?.id)
        return toast.show({
          title: "Erro Inesperado",
          placement: "top",
        });
      const result = await deleteWaitingList(logadoInfo?.id, data[0].id);
      await getPartyForCodApi();
      toast.show({
        title: "Você saiu do Evento",
        placement: "top",
      });
    } catch (error) {
      toast.show({
        title: "error com o host",
        placement: "top",
      });
    }
  }

  return (
    <>
      <Modal.Header>Procurar Evento</Modal.Header>
      <Modal.Body>
        <Flex direction="row" justifyContent="center" alignItems="center" mb={5}>
          <Input
            mr={2}
            flex={3}
            onChangeText={(e) => setCodInvite(e)}
            size="md"
            type="text"
            placeholder="Código do Evento"
          />

          <ButtonSimple
            isLoading={load}
            leftIcon={<Icon as={FontAwesome5} name="search" size="lg" />}
            backgroundColor="primary.200"
            size="lg"
            flex={1}
            onPress={getPartyForCodApi}
          ></ButtonSimple>
        </Flex>
        {data.map((e) => (
          <ListEvent
            onPress={isParticiping ? deleteWaitingListApi : insertWaitingListApi}
            key={e.id}
            data={e.date}
            titleButao={isParticiping ? "Sair" : "Participar"}
            titulo={e.name}
            codigo={e.codInvite}
            buttonColor={isParticiping ? "danger.700" : "tertiary.500"}
          />
        ))}
      </Modal.Body>
    </>
  );
};

export default SeachEvent;
