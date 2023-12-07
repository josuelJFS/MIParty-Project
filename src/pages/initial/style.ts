import styled from "styled-components/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { lightTheme, Theme } from "../../theme/theme";
import { LinearGradient } from "expo-linear-gradient";
//..
export const ContainerLogo = styled.View`
  flex: 6;
  justify-content: center;
  align-items: center;
  justify-content: flex-end;
`;

export const ContainerText = styled.View`
  flex: 1;
`;

export const ContainerButtons = styled.View`
  flex: 3;
  align-items: center;
  margin: ${wp(10)}px;
`;

export const Logo = styled.Image`
  width: ${wp(70)}px;
  height: ${wp(70)}px;
`;

export const TextMidButtons = styled.Text`
  flex: 1;
  color: ${lightTheme.secundary};
`;
export const ContainerTextMidButtons = styled.Text`
  margin: ${wp(4)}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ContainerLogin = styled(LinearGradient)`
  flex: 1;
`;
export const ButtonsSocial = styled.TouchableOpacity`
  width: ${wp(75)}px;
  height: ${wp(13)}px;
  background-color: grey;
  border-radius: 8px;
  background-color: ${Theme.colors.white};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const ContainerTextButtons = styled.View`
  flex: 7;
  justify-content: center;
  align-items: center;
`;
export const TextButtons = styled.Text`
  color: ${Theme.colors.GreyMedium};
  font-size: ${wp(3.5)}px;
`;

export const ContainerImgButtons = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
`;
export const ContainerFooter = styled.View`
  flex: 2;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const TextFooter = styled.Text`
  align-items: center;
  margin: ${wp(5)}px;
  color: ${lightTheme.secundary};
  font-size: ${wp(2.3)}px;
`;
export const IconButtons = styled.Image`
  width: ${wp(10)}px;
  height: ${wp(10)}px;
`;
export const HorizontalLine = styled.View`
  flex: 0.03;
  height: ${wp(9)}px;
  width: ${wp(1)}px;
  background: ${Theme.colors.GreyMedium};
`;
