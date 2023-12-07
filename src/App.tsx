import React, { useState, useEffect, useRef, useContext, useCallback } from "react";
import "react-native-gesture-handler";
import { AutenticacaoProvider, useAutenticacaoContext } from "./contexts/autenticacao";
import Routas from "./rotas/index";
import { NavigationContainer } from "@react-navigation/native";
import * as Updates from "expo-updates";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import { Alert, Platform } from "react-native";
import { useFonts, Roboto_900Black, Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";
import { Inter_700Bold, Inter_600SemiBold } from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import { NativeBaseProvider } from "native-base";
import { themeBase } from "./theme/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SSRProvider } from "@react-aria/ssr";

function App() {
  const { setAcesso } = useAutenticacaoContext();
  useEffect(() => {
    async function updateApp() {
      try {
        const { isAvailable } = await Updates.checkForUpdateAsync();
        if (isAvailable) {
          Alert.alert(
            "UPDATE MIP",
            "Nova Atualização Disponivel",
            [
              {
                text: "ATUALIZAR",
                onPress: async () => {
                  await Updates.fetchUpdateAsync();
                  await Updates.reloadAsync();
                },
              },
            ],
            { cancelable: false },
          );
          await AsyncStorage.removeItem("@logadoInfo");
          await AsyncStorage.removeItem("@token");
          setAcesso(false);
        }
      } catch (error) {
        console.log("error update nao pode verificar no expo cliente");
      }
    }
    updateApp();
  }, []);

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }

  Platform.OS === "android" && changeScreenOrientation();

  const [fontsLoaded] = useFonts({
    Roboto_900Black,
    Roboto_400Regular,
    Inter_700Bold,
    Roboto_500Medium,
    Inter_600SemiBold,
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  async function loaded() {
    await SplashScreen.hideAsync();
  }

  if (fontsLoaded) loaded();

  return (
    <AutenticacaoProvider>
      <NavigationContainer>
        <SSRProvider>
          <NativeBaseProvider theme={themeBase}>
            <Routas />
          </NativeBaseProvider>
        </SSRProvider>
      </NavigationContainer>
      <StatusBar style="light" />
    </AutenticacaoProvider>
  );
}

export default App;
