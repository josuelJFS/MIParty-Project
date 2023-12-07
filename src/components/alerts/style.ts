import styled from "styled-components/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const Container = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 999;
  justify-content: center;
  align-items: center;
`;

export const AlertContainer = styled.View`
  width: 90%;
  height: 30%;
  background-color: #fff;
  border-radius: 15px;
`;

export const Header = styled.View``;

export const TextType = styled.Text`
  font-size: ${wp(8)}px;
  font-family: Roboto_900Black;
  text-align: center;
`;

export const ContainerMenssage = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 4px;
`;

export const Mensage = styled.Text`
  color: #6a6a6a;
  font-size: ${wp(5)}px;
`;
