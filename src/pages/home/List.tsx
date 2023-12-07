import React from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, GestureResponderEvent } from "react-native";
import { ContainerFlatlist, styles, TexMenuMini } from "./style";
import { IconsFontAwesome5, IconsMaterialCommunity } from "../../icons";
import { FontAwesome, Ionicons, Octicons } from "@expo/vector-icons";
import { Theme } from "../../theme/theme";
import { useNavigation } from "@react-navigation/native";
import ModalApp from "../../components/modal";

type metodProps = {
  onPress: (e: GestureResponderEvent) => void;
  title: string;
  Icon: React.ElementType;
  iconNameUsed: string;
  subTitulo: string;
  router: string;
};

type props = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DATA = [
  {
    id: "1",
    title: "Criar Evento",
    Icon: IconsMaterialCommunity,
    iconNameUsed: "puzzle-plus",
    subTitulo: "Crie e personalise um evento Exclusivo",
    router: "registerEvent",
  },
  {
    id: "9",
    title: "Meus Convites",
    Icon: IconsMaterialCommunity,
    iconNameUsed: "email",
    subTitulo: "Veja seus Convites",
    router: "MeusConvites",
  },
  {
    id: "2",
    title: "Alterar Evento",
    Icon: IconsMaterialCommunity,
    iconNameUsed: "stack-exchange",
    subTitulo: "Altere ou Apague um Evento",
    router: "listaEventos",
  },
  {
    id: "3",
    title: "Procurar Evento",
    Icon: FontAwesome,
    iconNameUsed: "search",
    subTitulo: "Registre um convidado que vai participar do seu evento",
    router: "procurarEventos",
  },
  {
    id: "4",
    title: "Convidados",
    Icon: Ionicons,
    iconNameUsed: "people",
    subTitulo: "administre ou Aceite convidados",
    router: "listEventosConvidados",
  },
  {
    id: "5",
    title: "Scanear",
    Icon: IconsMaterialCommunity,
    iconNameUsed: "qrcode-scan",
    subTitulo: "Scanei o AQCODE do convidado e saiba em tempo real se ele tem o convite",
    router: "ListEventoScaner",
  },
  {
    id: "6",
    title: "CheckList",
    Icon: Octicons,
    iconNameUsed: "checklist",
    subTitulo: "Scanei o AQCODE do convidado e saiba em tempo real se ele tem o convite",
    router: "checklistEventos",
  },
];

const List: React.FC<props> = ({ setModalOpen }) => {
  const navigation = useNavigation();
  const renderItem = ({ item }: any) => {
    const { Icon, iconNameUsed, title, router } = item as metodProps;

    return (
      <ContainerFlatlist
        onPress={() => (title == "Procurar Evento" ? setModalOpen(true) : navigation.navigate(router))}
        style={styles.shadown}
      >
        <Icon name={iconNameUsed} size={Theme.func.wp(11)} color="#580679" />
        <TexMenuMini>{title}</TexMenuMini>
      </ContainerFlatlist>
    );
  };

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default List;
