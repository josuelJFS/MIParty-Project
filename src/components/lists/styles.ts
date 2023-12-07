import styled from "styled-components/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const RenderHeader = styled.View`
  width: 100%;
  height: ${hp(9)}px;
  background-color: red;
  margin-top: 10px;
  background: #fafafa;
  flex-direction: row;
  border-radius: 10px;
`;

export const ContainerImg = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ContainerText = styled.View`
  flex: 4;
  justify-content: center;
`;

export const ContainerIcon = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TextTitle = styled.Text`
  font-family: "Roboto_400Regular";
  font-style: normal;
  font-weight: 700;
  font-size: ${wp(6)}px;
  color: #787878;
  margin-left: 10px;
`;

export const TextTitle2 = styled.Text`
  font-family: "Roboto_400Regular";
  font-style: normal;
  font-weight: 700;
  font-size: ${wp(5)}px;
  color: #787878;
  text-align: center;
`;

export const ContainerAccordionItem = styled.ScrollView`
  width: 100%;
  height: ${hp(50)}px;
  background: #fafafa;
`;

export const ItenInAcordion = styled.TouchableOpacity`
  width: 95%;
  height: ${hp(9)}px;
  background: #fff;
  border-radius: 10px;
  flex-direction: row;
  margin-top: 10px;
  border: solid 1px #e7e7e7;
`;

export const Img = styled.Image`
  width: ${wp(13)}px;
  height: ${wp(13)}px;
  border-radius: 50px;
`;

export const ContainerSimpleAccordion = styled.View`
  width: 100%;
  height: ${hp(12)}px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
