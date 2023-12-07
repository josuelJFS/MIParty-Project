import { Route, RouteProp, useRoute } from "@react-navigation/native";
import { Box, Center, Container, Text, Icon, Flex, Divider, Heading, ScrollView, Button } from "native-base";
import React, { useState } from "react";
import { ImageBackground } from "react-native";
import { backGroundConvite, icon2 } from "../../img/index";
import { Entypo } from "@expo/vector-icons";
import SvgQRCode from "react-native-qrcode-svg";
import { useAutenticacaoContext } from "../../contexts/autenticacao";
import moment from "moment";
import "moment/locale/pt-br";
import Modal from "../../components/modal";
import { SubTitulo } from "../home/style";

type propsMEusConvites = {
  id: number;
  id_party: number;
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
  obs: string;
  categoria: string;
};

const Convite: React.FC = () => {
  moment.locale("pt-br");
  const [qrFull, setQrFull] = useState(false);
  const params: any = useRoute();
  const party: propsMEusConvites = params.params;
  const { logadoInfo } = useAutenticacaoContext();

  return (
    <ImageBackground style={{ flex: 1 }} resizeMode="stretch" source={backGroundConvite}>
      <Modal size="lg" isOpen={qrFull} onClose={setQrFull}>
        <Box alignItems="center" justifyContent="center" h="400px">
          <SvgQRCode logo={icon2} size={200} value={logadoInfo.email + "|" + party.id_party} />
        </Box>
      </Modal>
      <ScrollView flex={1}>
        <Box mt="50px" alignItems="center" flex={1}>
          <Box
            justifyContent="center"
            alignItems="center"
            w="70%"
            h="39"
            backgroundColor="#1ACAAA"
            _text={{ color: "#fff" }}
          >
            VOCÊ FOI CONVIDADO
          </Box>
          <Text textAlign="center" w="70%" fontSize="4xl" bold color="#fff">
            {logadoInfo.primeiroNome}
            <SubTitulo>{party.categoria}</SubTitulo>
          </Text>
          <Text textAlign="center" w="70%" fontSize="3xl" bold color="#fff">
            {party.nameParty}
          </Text>
          <Flex w="70%" mb={4} direction="row" justifyContent="center">
            <Icon as={<Entypo name="location-pin" />} size={5} color="#fff" />
            <Text textAlign="center" fontSize="xs" color="#fff">
              {party.address} {party.city} {party.state}
            </Text>
          </Flex>
          <Text textAlign="center" w="70%" fontSize="3xl" bold color="#fff">
            {moment(party.date).format("ll")}
          </Text>

          <Text mb={4} textAlign="center" w="70%" fontSize="md" color="#fff">
            {moment(party.date).format("dddd") + "|" + party.time}
          </Text>
          <Text mb={4} textAlign="center" w="70%" fontSize="xs" bold color="#fff">
            OBS:{party.obs}
          </Text>
          <Button
            onPress={() => setQrFull(true)}
            bgColor="#fff"
            mb={6}
            flex={1}
            justifyContent="center"
            alignItems="center"
          >
            <SvgQRCode logo={icon2} size={160} value={logadoInfo.email + "|" + party.id_party} />
          </Button>
        </Box>
      </ScrollView>
    </ImageBackground>
  );
};

export default Convite;
