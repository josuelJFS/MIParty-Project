import React from "react";
import { Alert, GestureResponderEvent, Modal, StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ButtonSimple } from "../buttons";
import { Container, AlertContainer, Header, TextType, ContainerMenssage, Mensage } from "./style";

type props = {
  title: string;
  message: string;
  type: "Error" | "Caution";
  onPress?: (event: GestureResponderEvent) => void;
  active: boolean;
};

const AlertScreen: React.FC<props> = ({ message, title, type, onPress, active = false }) => {
  let tipe = "";
  if (type == "Error") tipe = "#EE6B6B";
  if (type == "Caution") tipe = "#E6F81B";
  return (
    <Modal animationType="slide" transparent={true} visible={active}>
      <Container>
        <AlertContainer style={styles.alert}>
          <Header>
            <TextType style={{ color: tipe }}>{title}</TextType>
          </Header>
          <ContainerMenssage>
            <Mensage>{message}</Mensage>
          </ContainerMenssage>
          <View>
            <ButtonSimple onPress={onPress} />
          </View>
        </AlertContainer>
      </Container>
    </Modal>
  );
};

export const AlertPrompt = (
  titulo: string,
  msg: string,
  onClick: () => void,
  onCancel: () => void,
  btnCancel?: string,
  btnConfirm?: string,
) => {
  Alert.alert(titulo, msg, [
    {
      text: btnCancel || "Cancelar",
      onPress: () => onCancel(),
      style: "cancel",
    },
    { text: btnConfirm || "Confirmar", onPress: () => onClick() },
  ]);
};

const styles = StyleSheet.create({
  alert: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export { AlertScreen };
