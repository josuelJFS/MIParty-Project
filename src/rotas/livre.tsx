import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { forHorizontalIOS } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators";
import React from "react";
import tela_init from "../pages/initial";

const Stack = createStackNavigator();

const Livre = () => {
  return (
    <Stack.Navigator detachInactiveScreens={false}>
      <Stack.Screen
        name="init"
        component={tela_init}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default Livre;
