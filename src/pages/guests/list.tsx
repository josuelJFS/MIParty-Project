import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Box, Center, Text, Input, Icon, Button, useToast, useClipboard } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAutenticacaoContext } from "../../contexts/autenticacao";
import getEventById, { eventProps } from "../../service/api/getEventsById";

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
  codInvite: number;
  categorias: Array<{ title: string }>;
};

const EditEvent: React.FC = () => {
  const [listEvents, setListEvent] = useState<Array<requestCreate>>([]);
  const [load, setLoad] = useState(false);
  const toast = useToast();
  const { logadoInfo, setLoadFull, logof } = useAutenticacaoContext();
  const navigation = useNavigation();
  const { value, onCopy } = useClipboard();

  useEffect(() => {
    navigation.addListener("focus", () => {
      getEvents();
    });
  }, []);

  async function getEvents() {
    setLoad(true);
    try {
      const res = await getEventById(logadoInfo.id);
      setListEvent(res.data.result);
      setLoad(false);
    } catch (error) {
      setLoad(false);
      toast.show({
        title: "Aconteceu um Erro",
        placement: "bottom",
      });
    }
  }

  const ItenList = ({ item }: any) => {
    return (
      <Box shadow="1" key={item.id} bgColor="muted.50" w="100%" h="85px" mb={4}>
        <Center flex={1} m={1.5}>
          <Text fontWeight="bold" fontSize="12" color="muted.500">
            {item.name}
          </Text>
        </Center>
        <Box flexDirection="row" p={2} flex={2}>
          <Input
            borderColor="#fff"
            bg="muted.200"
            fontFamily="Roboto_400Regular"
            mr={2}
            isDisabled={true}
            flex={2}
            InputRightElement={
              <TouchableOpacity
                onPress={() => {
                  onCopy(item?.codInvite);
                  toast.show({
                    title: "Copiado",
                    placement: "bottom",
                  });
                }}
              >
                <Icon mr={2} as={<MaterialIcons name="file-copy" />} size={5} ml="2" color="muted.400" />
              </TouchableOpacity>
            }
            placeholder={item.codInvite}
          />
          <Center flex={1}>
            <Button bg="primary.200" w="70%" onPress={() => navigation.navigate("guests", item)}>
              Entrar
            </Button>
          </Center>
        </Box>
      </Box>
    );
  };
  return (
    <Box flex={1}>
      <Center mt="5">
        <FlatList
          refreshing={load}
          onRefresh={getEvents}
          style={{ width: "90%", height: "100%" }}
          contentContainerStyle={{ justifyContent: "center" }}
          data={listEvents}
          renderItem={ItenList}
        ></FlatList>
      </Center>
    </Box>
  );
};

export default EditEvent;
