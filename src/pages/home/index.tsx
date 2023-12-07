import React, { useEffect, useRef, useState } from "react";
import { Text } from "react-native";
import { useAutenticacaoContext } from "../../contexts/autenticacao";
import { backGround, icon, leftImgSuport, rightImgSuport } from "../../img";
import { registerForPushNotificationsAsync } from "../../service/pushNotification";
import ImgArrow from "../../svg/imgArrowLeft";
import MapView, { AnimatedRegion, Animated, MapViewProps, Geojson, Marker } from "react-native-maps";
import * as Location from "expo-location";

import {
  ContainerTop,
  ContainerLogo,
  ContainerNomeUser,
  LogoIcon,
  NomeUser,
  ContainerBoasVindas,
  ContainerImgUser,
  ContainerButtom,
  Titulo,
  SubTitulo,
  ImgUser,
  ImgLines,
  ContainerBackGround,
  ContainerImgWithImg,
  ContainerList,
} from "./style";
import List from "./List";
import getEventById, { eventProps } from "../../service/api/getEventsById";
import { useNavigation } from "@react-navigation/native";
import ModalApp from "../../components/modal";
import SeachEvent from "../seachEvent";
import deleteWaitingList from "../../service/api/deleteWaitingList";
import postTokenNotification from "../../service/api/postTokenNotification";
import { Alert, Avatar, Box } from "native-base";
import getAllForUserIdConvidados from "../../service/api/getAllConvidadosForUserID";

type propsEvents = {
  name: string;
  date: string;
  maxGuests: string;
  address: string;
  city: string;
  state: string;
  postalCod: string;
  valueParty: string;
  usersId: number;
  cordenades: any;
  time: string | number;
};
type convidados = {
  id: number;
  nome: string;
  email: string;
  img: string;
  usersId: number;
  name: string;
  cordenades: string;
};

const Home: React.FC = () => {
  const { logadoInfo, setLoadFull, logof } = useAutenticacaoContext();
  const [location, setLocation] = useState<Location.LocationObject>({} as Location.LocationObject);
  const [errorMsg, setErrorMsg] = useState("");
  const [events, setEvents] = useState<Array<propsEvents>>([]);
  const [eventsConvidados, setEventosConvidados] = useState<Array<convidados>>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const mapRef = useRef(null);
  const navigation = useNavigation();

  const [cords, setCords] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00921,
  });

  async function getTokenExpoPushNotification() {
    try {
      const token = await registerForPushNotificationsAsync();
      const data = await postTokenNotification({ tokenPush: token, usersId: logadoInfo.id });
    } catch (error) {
      console.log(error);
    }
  }
  async function loadEvents() {
    if (!logadoInfo.id) return;
    const result = await getEventById(logadoInfo.id);
    const resultConvidados = await getAllForUserIdConvidados(logadoInfo.id);
    setEvents(result.data.result);
    setEventosConvidados(resultConvidados.data.result);
  }
  useEffect(() => {
    getTokenExpoPushNotification();
    loadLocalozation();

    navigation.addListener("focus", () => {
      loadEvents();
    });
  }, []);

  async function loadLocalozation() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});

    setLocation(location);
    const newRegion = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.09922,
      longitudeDelta: 0.09921,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    mapRef.current.animateToRegion(newRegion, 3 * 1000);
  }

  return (
    <ContainerBackGround>
      <ContainerTop>
        <ModalApp isOpen={modalOpen} onClose={(e) => setModalOpen(e)}>
          <Box zIndex={99999}>
            <SeachEvent />
          </Box>
        </ModalApp>
        <ContainerLogo onPress={logof}>
          <LogoIcon resizeMode="cover" source={icon} />
          <ContainerImgWithImg>
            <ContainerImgUser>
              <ImgLines resizeMode="cover" source={leftImgSuport} />
              <ImgUser resizeMode="cover" source={{ uri: logadoInfo.img }} />
              <ImgLines resizeMode="cover" source={rightImgSuport} />
            </ContainerImgUser>
            <NomeUser>Ola, {logadoInfo.primeiroNome}</NomeUser>
          </ContainerImgWithImg>
        </ContainerLogo>
        <ContainerBoasVindas>
          <Titulo> BEM-VINDO! </Titulo>
          <SubTitulo>Aqui você tem total gerenciamento do seu evento com alguns passos.</SubTitulo>
        </ContainerBoasVindas>
        <ContainerList>
          <List setModalOpen={setModalOpen} />
        </ContainerList>
      </ContainerTop>
      <ContainerButtom>
        <MapView provider="google" ref={mapRef} style={{ flex: 1 }} showsUserLocation={true}>
          {events?.length > 0 &&
            events.map((e, i) => (
              <Marker
                key={i}
                coordinate={{
                  latitude: Number(e.cordenades ? JSON.parse(e.cordenades).latitude : 0),
                  longitude: Number(e.cordenades ? JSON.parse(e.cordenades).longitude : 0),
                }}
                title={e.name}
              ></Marker>
            ))}
          {eventsConvidados?.length > 0 &&
            eventsConvidados.map((e, i) => (
              <Marker
                key={i}
                coordinate={{
                  latitude: Number(e.cordenades ? JSON.parse(e.cordenades).latitude : 0),
                  longitude: Number(e.cordenades ? JSON.parse(e.cordenades).longitude : 0),
                }}
                title={e.name}
              >
                <Avatar
                  size="xs"
                  source={{
                    uri: e.img,
                  }}
                />
              </Marker>
            ))}
        </MapView>
      </ContainerButtom>
    </ContainerBackGround>
  );
};

export default Home;
