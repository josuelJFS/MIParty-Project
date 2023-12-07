import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Linking,
  Alert,
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useFonts, Roboto_900Black, Roboto_400Regular } from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";
import { makeRedirectUri, useAuthRequest, ResponseType } from "expo-auth-session";
import Load from "../../components/load";
import http from "../../service/apiAxios";
import { useAutenticacaoContext } from "../../contexts/autenticacao";
import * as WebBrowser from "expo-web-browser";
import { ContainerApp } from "../../components/Container/container";
import * as AppleAuthentication from "expo-apple-authentication";
import {
  ButtonsSocial,
  ContainerButtons,
  ContainerFooter,
  ContainerImgButtons,
  ContainerLogin,
  ContainerLogo,
  ContainerText,
  ContainerTextButtons,
  ContainerTextMidButtons,
  HorizontalLine,
  IconButtons,
  Logo,
  TextButtons,
  TextFooter,
  TextMidButtons,
} from "./style";

import * as AuthSession from "expo-auth-session";
type props = {
  navigation: any;
};

type googleProps = {
  params: {
    access_token: string;
  };
  type: string;
};

type tokenreturnGoogle = {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: true;
};
WebBrowser.maybeCompleteAuthSession();
const Login: React.FC<props> = ({ navigation }) => {
  const { setAcesso, setLogadoInfo, setLoadFull, theme } = useAutenticacaoContext();

  const googleAnimation = useRef(null);

  const [titleDisable, setTitleDisable] = useState(false);
  const [showAnimationBt, setShowAnimationBt] = useState(true);

  async function googleLogin() {
    const client_id = "455165442208-kckj7557vl33v9metng8h0f0t1ed9dul.apps.googleusercontent.com";
    const redirect_url = "https://auth.expo.io/@josuel123/MIParty";
    const response_type = "token";
    const scope = encodeURI("email profile");

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_url}&response_type=${response_type}&scope=${scope}`;
    const dados = (await AuthSession.startAsync({
      authUrl,
    })) as googleProps;
    if (!dados.params.access_token) return;
    laod(dados.params.access_token);
  }

  async function facebookLogin() {
    const client_id = "826377801834329";
    const redirect_url = "https://auth.expo.io/@josuel123/MIParty";
    const response_type = "token";
    const scope = encodeURI("email");
    const authUrl = `https://www.facebook.com/v14.0/dialog/oauth?client_id=${client_id}&redirect_uri=${redirect_url}&response_type=${response_type}&scope=email`;
    const dados = (await AuthSession.startAsync({
      authUrl,
    })) as googleProps;
    if (!dados.params.access_token) return;
    await laodFacebook(dados.params.access_token);
  }

  async function laod(e: string) {
    setLoadFull(true);
    const userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${e}` },
    });

    const resultado = (await userInfoResponse.json()) as tokenreturnGoogle;

    try {
      const login12 = await http.post("login/loginSocial", {
        nome: resultado.name,
        email: resultado.email,
        img: resultado.picture,
      });

      setLogadoInfo({
        token: login12.data.token,
        ...login12.data.result[0],
        img: resultado.picture,
        primeiroNome: resultado.given_name,
      });
      setAcesso(true);
      setLoadFull(false);
    } catch (error) {
      console.log(error);
      setLoadFull(false);

      Alert.alert("ERRO GOOGLE");
    }
  }

  async function laodFacebook(e: string) {
    setLoadFull(true);
    const userInfoResponse = await fetch(
      "https://graph.facebook.com/v14.0/me?fields=id,name,picture.type(large),email,first_name&access_token=" + e,
    );

    const resultado = (await userInfoResponse.json()) as any;

    try {
      const login12 = await http.post("login/loginSocial", {
        nome: resultado.name,
        email: resultado.email,
        img: resultado.picture.data.url,
      });

      setLogadoInfo({
        token: login12.data.token,
        ...login12.data.result[0],
        img: resultado.picture.data.url,
        primeiroNome: resultado.first_name,
      });
      setAcesso(true);
      setLoadFull(false);
    } catch (error) {
      setLoadFull(false);
      Alert.alert("ERRO FACEBOOK");
    }
  }

  async function apple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      console.log(credential);
      // signed in
    } catch (e) {
      if (e.code === "ERR_CANCELED") {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  }

  function playAnimation() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    googleAnimation.current.play();
    setTitleDisable(true);
  }

  return (
    <ContainerApp>
      <Load />
      <ContainerLogin colors={["#201D75", "#470D78"]} start={{ x: -0.3, y: 0.5 }}>
        <ContainerLogo>
          <Logo source={require("../../img/logoIcon.png")} resizeMode="contain" />
        </ContainerLogo>
        <ContainerButtons>
          <ButtonsSocial onPress={googleLogin}>
            <ContainerImgButtons>
              <IconButtons source={require("../../img/SocialGoogle.png")} resizeMode="contain" />
            </ContainerImgButtons>
            <HorizontalLine></HorizontalLine>
            <ContainerTextButtons>
              <TextButtons>Conectar-se com Google</TextButtons>
            </ContainerTextButtons>
          </ButtonsSocial>
          <ContainerTextMidButtons>
            <TextMidButtons>OU</TextMidButtons>
          </ContainerTextMidButtons>
          <ButtonsSocial onPress={facebookLogin}>
            <ContainerImgButtons>
              <IconButtons source={require("../../img/SocialFacebook.png")} resizeMode="contain" />
            </ContainerImgButtons>
            <HorizontalLine></HorizontalLine>
            <ContainerTextButtons>
              <TextButtons>Conectar-se com Facebook</TextButtons>
            </ContainerTextButtons>
          </ButtonsSocial>
        </ContainerButtons>
        <ContainerFooter>
          <TextFooter>Ajuda</TextFooter>
          <TextFooter>Privacidade</TextFooter>
          <TextFooter>Termos de uso</TextFooter>
        </ContainerFooter>
      </ContainerLogin>
    </ContainerApp>
  );
};

export default Login;
