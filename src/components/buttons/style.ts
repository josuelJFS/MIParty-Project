import styled from "styled-components/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const ButtonDeault = styled.TouchableOpacity`
  width: 84%;
  height: ${hp(8)}px;
  background: rgba(32, 29, 117, 0.69);
  border: 1px solid #0c05d9;
  border-radius: 20px;
  flex-direction: row;
`;

export const TextButton = styled.Text`
  color: #fff;
  font-family: Roboto_400Regular;
  font-size: ${wp(4.5)}px;
  top: -2px;
`;

export const ImageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const TextContainer = styled.View`
  flex: 3;
  justify-content: center;
`;
