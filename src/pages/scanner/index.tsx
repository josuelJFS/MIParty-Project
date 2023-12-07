import { Avatar, Box, Container, Icon, Text, useToast } from "native-base";
import React, { useState } from "react";
import { MaterialIcons, Ionicons, Entypo, AntDesign, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { ButtonSimple } from "../../components/buttons";
import ScannerComponent from "../../components/camera";
import getQrCode from "../../service/api/getQrCodeScanner";
import postCheckList from "../../service/api/postCheckList";
import { useRoute } from "@react-navigation/native";

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

type dataScaner = {
  id: number;
  nome: string;
  email: string;
  img: string;
  categoria: string;
};

const Scanner: React.FC = () => {
  const [scan, setScan] = useState(false);
  const [verify, setVerify] = useState(false);
  const [data, setData] = useState<Array<dataScaner>>([]);
  const parans: any = useRoute();
  const [evento, setEvento] = useState<requestCreate>(parans.params);
  const toast = useToast();

  async function scannerQr(e: any) {
    setScan(false);
    const scannerValues = e?.data?.split("|");

    const result = await getQrCode(scannerValues[0], evento.id);

    if (result.data.status) {
      if (scannerValues[1] != evento.id) return setScan(false);
      setVerify(true);
      setData(result.data.result);
      const resultcheck = await postCheckList({ id_party: evento.id, userID: result.data.result[0].id });
      if (!resultcheck.data.status) {
        toast.show({
          title: resultcheck.data.mensage,
          placement: "top",
        });
      }
      return;
    } else {
      setVerify(false);
    }
  }
  return (
    <Box flex={1} alignItems="center" mt="5">
      {scan ? (
        <Box mt="-5" size="full" justifyContent="center" alignItems="center">
          <Box size="xs">
            <ScannerComponent onBarCodeScanned={scan ? scannerQr : undefined} />
          </Box>
        </Box>
      ) : (
        <>
          <Avatar
            size="58px"
            source={{
              uri: data[0]?.img,
            }}
          />
          <Text mt="4" textAlign="center" fontSize="3xl" bold color="primary.200">
            {data[0]?.nome}
          </Text>
          <Text mt="1" textAlign="center" fontSize="2xs" bold color="primary.500">
            {verify ? "Verificado" : "N/A"}
          </Text>
          <Box alignItems="center" justifyContent="center" flex={2}>
            <Icon
              as={<AntDesign name={verify ? "checkcircle" : "closecircle"} />}
              color={verify ? "tertiary.400" : "error.500"}
              size="140px"
            />
            <Text mb="4" textAlign="center" fontSize="4xl" bold color="indigo.900">
              {data[0]?.categoria}
            </Text>
          </Box>
        </>
      )}
      {!scan && (
        <ButtonSimple onPress={() => setScan(true)} bgColor="primary.200" width="100px" mb={6}>
          <Icon size="lg" as={<MaterialCommunityIcons name="qrcode-scan" />} color="#fff" />
        </ButtonSimple>
      )}
    </Box>
  );
};

export default Scanner;
