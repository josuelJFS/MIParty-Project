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
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { MaterialIcons, Ionicons, Entypo, AntDesign, FontAwesome } from "@expo/vector-icons";
import getMeusConvites from "../../service/api/getMeusConvites";
import { useAutenticacaoContext } from "../../contexts/autenticacao";
import { useNavigation, useRoute } from "@react-navigation/native";
import getAllCheckList from "../../service/api/getAllCheckList";
import deleteCheckList from "../../service/api/deleteCheckList";

type propsChekclIst = {
  id: number;
  nome: string;
  email: string;
  img: string;
  idChecklist: number;
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
  cordenades: { latitude: any; longitude: any };
  time: string | number;
  codInvite: number;
  categorias: Array<{ title: string }>;
};

const CheckList: React.FC = () => {
  const navigation = useNavigation();
  const { logadoInfo } = useAutenticacaoContext();
  const [load, setLoad] = useState(false);
  const [checklist, setCheckList] = useState<Array<propsChekclIst>>([]);
  const params: any = useRoute();
  const party: requestCreate = params.params;
  const toast = useToast();

  async function loadCheckLsit() {
    setLoad(true);
    const resul = await getAllCheckList(party.id);
    setCheckList(resul.data.result);
    setLoad(false);
  }

  useEffect(() => {
    navigation.addListener("focus", () => {
      loadCheckLsit();
    });
  });

  function dateFormat(date: Date) {
    const dateFor = new Date(date);
    return dateFor.toLocaleDateString();
  }

  async function deleteChecklistfc(id: number) {
    setLoad(true);
    try {
      await deleteCheckList(id);
      await loadCheckLsit();
      toast.show({
        title: "Convidado Removido",
        placement: "top",
      });
      setLoad(false);
    } catch (error) {
      setLoad(false);
    }
  }

  const renderItem = ({ item }: { item: propsChekclIst }) => (
    <Box>
      <Pressable
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
            <Text
              color="coolGray.600"
              numberOfLines={1}
              ellipsizeMode="tail"
              _dark={{
                color: "warmGray.200",
              }}
            ></Text>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );

  const renderHiddenItem = (data: { item: propsChekclIst }, rowMap: any) => (
    <HStack flex="1" pl="2" justifyContent="flex-end">
      <Pressable
        onPress={() => deleteChecklistfc(data.item.idChecklist)}
        w="70"
        justifyContent="center"
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon as={<MaterialIcons name="delete" />} color="red.500" size="3xl" />
        </VStack>
      </Pressable>
    </HStack>
  );
  return (
    <Box flex={1} pt="4" bg="#ffffff">
      <SwipeListView
        data={checklist}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-148}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        refreshing={load}
        onRefresh={loadCheckLsit}
      />
    </Box>
  );
};

export default CheckList;
