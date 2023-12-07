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
import { useNavigation } from "@react-navigation/native";

type propsMEusConvites = {
  id: number;
  nome: string;
  email: string;
  img: string;
  usersId: number;
  nameParty: string;
  address: string;
  city: string;
  state: string;
  date: Date;
  time: Date;
};

const MeusConvites: React.FC = () => {
  const navigation = useNavigation();
  const { logadoInfo } = useAutenticacaoContext();
  const [convites, setConvites] = useState<Array<propsMEusConvites>>([]);

  async function loadMeusConvites() {
    const resul = await getMeusConvites(logadoInfo.id);
    setConvites(resul.data.result);
  }

  useEffect(() => {
    navigation.addListener("focus", () => {
      loadMeusConvites();
    });
  });

  function dateFormat(date: Date) {
    const dateFor = new Date(date);
    return dateFor.toLocaleDateString();
  }

  const renderItem = ({ item }: { item: propsMEusConvites }) => (
    <Box>
      <Pressable
        onPress={() => navigation.navigate("convite", item)}
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
                {item.nameParty}
              </Text>
              <Text
                color="coolGray.600"
                numberOfLines={1}
                ellipsizeMode="tail"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                {item.nome}
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
            >
              {dateFormat(item.date)}
            </Text>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );

  const renderHiddenItem = (data: { item: any }, rowMap: any) => (
    <HStack flex="1" pl="2" justifyContent="flex-end">
      <Pressable
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
        data={convites}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-148}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
      />
    </Box>
  );
};

export default MeusConvites;
