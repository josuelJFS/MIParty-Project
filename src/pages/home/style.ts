import styled from "styled-components/native";
import { ImageBackground, StyleSheet } from "react-native";
import { Theme } from "../../theme/theme";

export const ContainerBackGround = styled.View`
  flex: 1;
  background-color: ${Theme.colors.purpleTertiary};
`;

export const LogoIcon = styled.Image`
  width: ${Theme.func.wp(10)}px;
  height: ${Theme.func.wp(10)}px;
`;

export const ImgUser = styled.Image`
  width: ${Theme.func.wp(14)}px;
  height: ${Theme.func.wp(14)}px;
  border-radius: 50px;
  border-width: 3px;
  border-color: ${Theme.colors.white};
`;

export const ImgLines = styled.Image`
  width: ${Theme.func.wp(1.6)}px;
  height: ${Theme.func.wp(7)}px;
  margin-left: 4px;
  margin-right: 4px;
`;

export const ContainerTop = styled.View`
  flex: 1;
  justify-content: space-evenly;
`;
export const ContainerList = styled.View`
  justify-content: center;
  align-items: center;
`;

export const ContainerBoasVindas = styled.View`
  justify-content: flex-end;
  align-items: center;
`;

export const ContainerImgUser = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const ContainerButtom = styled.View`
  flex: 1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;
`;

export const ContainerFlatlist = styled.TouchableOpacity`
  width: ${Theme.func.wp(30)}px;
  height: ${Theme.func.wp(26)}px;
  border-radius: 10px;
  background-color: ${Theme.colors.white};
  margin: 6px;
  align-items: center;
  justify-content: space-evenly;
`;

export const ContainerLogo = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  margin-left: 20px;
  margin-right: 20px;
`;
export const ContainerImgWithImg = styled.View``;

export const ContainerNomeUser = styled.View`
  flex: 4;
  align-items: flex-end;
  margin-right: ${Theme.func.wp(5)}px;
`;

export const NomeUser = styled.Text`
  color: #fff;
  font-size: ${Theme.font.size.body3_5};
  font-family: ${Theme.font.family.Roboto_500Medium};
  text-align: center;
`;

export const Titulo = styled.Text`
  color: #fff;
  font-size: ${Theme.font.size.titulo};
  font-family: ${Theme.font.family.Roboto_900Black};
`;

export const SubTitulo = styled.Text`
  color: #fff;
  font-size: ${Theme.font.size.body3};
  font-family: ${Theme.font.family.Roboto_400Regular};
  text-align: center;
`;

export const TexMenuMini = styled.Text`
  color: ${Theme.colors.GreyMedium};
  font-size: ${Theme.font.size.body3};
  font-family: ${Theme.font.family.Inter_600SemiBold};
  width: 90%;
  text-align: center;
`;

export const TexMenuBig = styled.Text`
  color: ${Theme.colors.purplePrimary};
  font-size: ${Theme.font.size.titulo2};
  font-family: ${Theme.font.family.Roboto_900Black};
  margin-bottom: 5px;
`;

export const styles = StyleSheet.create({
  shadown: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  shdown2: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
