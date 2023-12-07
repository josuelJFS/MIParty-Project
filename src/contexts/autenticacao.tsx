import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ScreenOrientation from "expo-screen-orientation";
import { Platform, StatusBar } from "react-native";
import axios from "../service/apiAxios";
import AppLoading from "expo-app-loading";
import Load from "../components/load";
import { darkTheme, themeProps, lightTheme } from "../theme/theme";
import * as NavigationBar from "expo-navigation-bar";

export interface Icontext {
  acesso?: boolean;
  setAcesso: (e: boolean) => void;
  setRotation: (e: boolean) => void;
  rotation: boolean;
  logadoInfo: logadoProps;
  setLogadoInfo: (e: logadoProps) => void;
  load: boolean;
  setLoad: (e: boolean) => void;
  loadFull: boolean;
  setLoadFull: (e: boolean) => void;
  themeDarkActive: boolean;
  setThemeDarkActive: (e: boolean) => void;
  perfilImg: string;
  setPerfilImg: (e: string) => void;
  setTheme: (e: themeProps) => void;
  theme: themeProps;
  heightAuto: any;
  logof?: () => void;
}

type logadoProps = {
  id: number;
  nome: string;
  email: string;
  token: string;
  img: string;
  primeiroNome: string;
};

type autprops = {
  children: any;
};

const AutenticacaoContext = createContext<Icontext>({} as Icontext);

const AutenticacaoProvider: React.FC<autprops> = ({ children }) => {
  const [acesso, setAcesso] = useState<boolean>(false);
  const [loadFull, setLoadFull] = useState<boolean>(true);
  const [perfilImg, setPerfilImg] = useState<string>("");
  const [themeDarkActive, setThemeDarkactive] = useState<boolean>(false);
  const [theme, setTheme] = useState<themeProps>(themeDarkActive ? darkTheme : lightTheme);
  const [load, setLoad] = useState<boolean>(false);
  const [rotation, setRotation] = useState<boolean>(false);
  const [logadoInfo, setLogadoInfo] = useState<logadoProps>({} as logadoProps);
  const [heightAuto, setHeightAuto] = useState<any>(StatusBar.currentHeight);

  useEffect(() => {
    if (acesso) {
      setStorage();
    }
  }, [acesso]);

  useEffect(() => {
    loadStorage();
    darkThemeLoad();
  }, []);

  useEffect(() => {
    darkThemeStorage(themeDarkActive);
    setTheme(themeDarkActive ? darkTheme : lightTheme);
  }, [themeDarkActive]);

  useEffect(() => {
    async function color() {
      await NavigationBar.setVisibilityAsync("hidden");
      await NavigationBar.setBackgroundColorAsync("#480E78");
    }
    Platform.OS === "android" && color();
  }, [theme]);

  async function validateToken() {
    try {
      const result = await axios.get("tokenValidate");
      if (!result.data.status) {
        deleteStorage();
        setAcesso(false);
        return false;
      }

      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async function setStorage() {
    const token: string = logadoInfo.token || "";
    await AsyncStorage.setItem("@logadoInfo", JSON.stringify(logadoInfo));
    await AsyncStorage.setItem("@token", token);
  }
  async function deleteStorage() {
    await AsyncStorage.removeItem("@logadoInfo");
    await AsyncStorage.removeItem("@token");
  }
  async function logof() {
    await AsyncStorage.removeItem("@logadoInfo");
    await AsyncStorage.removeItem("@token");

    setAcesso(false);
  }
  async function darkThemeStorage(e: any) {
    await AsyncStorage.setItem("@darkModeActive", JSON.stringify(e));
  }
  async function darkThemeLoad() {
    const active = await AsyncStorage.getItem("@darkModeActive");
    setThemeDarkactive(active == "true" ? true : false);
  }

  async function loadStorage() {
    setLoadFull(true);
    const logadoInfoStorage: any = await AsyncStorage.getItem("@logadoInfo");
    const token: any = await AsyncStorage.getItem("@token");
    const validate = await validateToken();
    setLoadFull(false);
    if (token && validate) {
      setLogadoInfo(JSON.parse(logadoInfoStorage));
      setAcesso(true);
    }
  }

  return (
    <AutenticacaoContext.Provider
      value={{
        acesso,
        setRotation,
        rotation,
        logadoInfo,
        setLogadoInfo,
        setAcesso,
        load,
        setLoad,
        theme,
        setTheme,
        heightAuto,
        loadFull,
        setLoadFull,
        logof,
        perfilImg,
        setPerfilImg,
        themeDarkActive,
        setThemeDarkActive: setThemeDarkactive,
      }}
    >
      {children}
    </AutenticacaoContext.Provider>
  );
};

const useAutenticacaoContext = () => {
  const context = useContext(AutenticacaoContext);

  return {
    ...context,
  };
};

export { AutenticacaoProvider, useAutenticacaoContext };
