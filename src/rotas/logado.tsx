import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import React from "react";
import tela_home from "../pages/home";
import AtualizarEvento from "../pages/EditEvent/editEvent";
import listaEventos from "../pages/EditEvent";
import guests from "../pages/guests";
import { useAutenticacaoContext } from "../contexts/autenticacao";
import listEventosConvidados from "../pages/guests/list";
import myInvites from "../pages/myInvites";
import convite from "../pages/myInvites/convite";
import registerEvent from "../pages/registerEvent";
import scanner from "../pages/scanner";
import ListEventosScaner from "../pages/scanner/ListEventos";
import checklistEventos from "../pages/checklist";
import checklistPage from "../pages/checklist/checklist";
import { useTheme } from "native-base";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
const Stack = createStackNavigator();

const Logado = () => {
  const { theme } = useAutenticacaoContext();
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      detachInactiveScreens={false}
    >
      <Stack.Screen
        name="home"
        component={tela_home}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="registerEvent"
        component={registerEvent}
        options={{
          title: "Cadastrar Evento",
          headerStyle: {
            backgroundColor: colors.primary[500],
            shadowColor: colors.primary[500],
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <Stack.Screen
        name="atualizarEvento"
        component={AtualizarEvento}
        options={{
          title: "Editar Evento",
          headerStyle: {
            backgroundColor: colors.primary[500],
            shadowColor: colors.primary[500],
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <Stack.Screen
        name="listaEventos"
        component={listaEventos}
        options={{
          title: "Lista de Eventos",
          headerStyle: {
            backgroundColor: colors.primary[500],
            shadowColor: colors.primary[500],
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <Stack.Screen
        name="guests"
        component={guests}
        options={{
          title: "Convidados",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyle: {
            backgroundColor: colors.primary[500],
            shadowColor: colors.primary[500],
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <Stack.Screen
        name="listEventosConvidados"
        component={listEventosConvidados}
        options={{
          title: "Lista de Eventos",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyle: {
            backgroundColor: colors.primary[500],
            shadowColor: colors.primary[500],
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <Stack.Screen
        name="MeusConvites"
        component={myInvites}
        options={{
          title: "Convites",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyle: {
            backgroundColor: colors.primary[500],
            shadowColor: colors.primary[500],
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <Stack.Screen
        name="convite"
        component={convite}
        options={{
          title: "Convite",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyle: {
            backgroundColor: colors.primary[500],
            shadowColor: colors.primary[500],
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <Stack.Screen
        name="scanner"
        component={scanner}
        options={{
          title: "scanner",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyle: {
            backgroundColor: colors.primary[500],
            shadowColor: colors.primary[500],
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <Stack.Screen
        name="checklistEventos"
        component={checklistEventos}
        options={{
          title: "Eventos",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyle: {
            backgroundColor: colors.primary[500],
            shadowColor: colors.primary[500],
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <Stack.Screen
        name="ListEventoScaner"
        component={ListEventosScaner}
        options={{
          title: "Eventos",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyle: {
            backgroundColor: colors.primary[500],
            shadowColor: colors.primary[500],
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <Stack.Screen
        name="checklist"
        component={checklistPage}
        options={{
          title: "CheckList",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyle: {
            backgroundColor: colors.primary[500],
            shadowColor: colors.primary[500],
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default Logado;
