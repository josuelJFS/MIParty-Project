import Constants from "expo-constants";
import { extendTheme, Input } from "native-base";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
export type themeProps = {
  primaryColor?: string;
  secundary?: string;
  itemColor?: string;
  tituloColor?: string;
  iconColor?: string;
  textComun?: string;
  iconColorReverse?: string;
  statusColors?: {
    positive?: string;
    negative?: string;
    default?: string;
  };
};

export const darkTheme = {
  primaryColor: "#151515",
  secundary: "#242424",
  itemColor: "#343434",
  tituloColor: "#fff",
  textComun: "#fff",
  iconColorReverse: "#24F4A9",
  iconColor: "#24F4A9",
  statusColors: {
    positive: "#11DF95",
    default: "#C4C4C4",
    negative: "#FF6B6B",
  },
};

export const lightTheme = {
  primaryColor: "#24F4A9",
  secundary: "#fff",
  itemColor: "#F5F5F5",
  tituloColor: "#9A9A9A",
  textComun: "#6B6B6B",
  iconColor: "#54BD9E",
  iconColorReverse: "#FFFFFF",
  statusColors: {
    positive: "#11DF95",
    default: "#C4C4C4",
    negative: "#FF6B6B",
  },
};

interface theme {
  colors: {
    bluePrimary: string;
    blueSecondary: string;
    blueTertiary: string;
    purplePrimary: string;
    purpleSecondary: string;
    purpleTertiary: string;
    GreyMedium: string;
    GreyMedium2: string;
    white: string;
  };
  font: {
    family: {
      Roboto_900Black: string;
      Roboto_400Regular: string;
      Inter_700Bold: string;
      Roboto_500Medium: string;
      Inter_600SemiBold: string;
    };
    size: {
      body3: string;
      body4: string;
      body3_5: string;
      titulo: string;
      titulo2: string;
    };
  };
  func: {
    wp: (value: string | number) => number;
    hp: (value: number | string) => number;
    heightTop: number;
  };
}

/**
 * @description Tema principal do MIParty
 */

export const Theme: theme = {
  colors: {
    bluePrimary: "#403CA0",
    blueSecondary: "#625EC0",
    blueTertiary: "#7A76DB",
    purplePrimary: "#841197",
    purpleSecondary: "#4A0754",
    purpleTertiary: "#480E78",
    GreyMedium: "#575757",
    white: "#ffffff",
    GreyMedium2: "#575757",
  },
  font: {
    family: {
      Inter_700Bold: "Inter_700Bold",
      Roboto_400Regular: "Roboto_400Regular",
      Roboto_900Black: "Roboto_900Black",
      Roboto_500Medium: "Roboto_500Medium",
      Inter_600SemiBold: "Inter_600SemiBold",
    },
    size: {
      body3_5: wp(3.5) + "px",
      body3: wp(3.1) + "px",
      body4: wp(4) + "px",
      titulo: wp(5) + "px",
      titulo2: wp(5.5) + "px",
    },
  },
  func: {
    wp: wp,
    hp: hp,
    heightTop: Constants.statusBarHeight,
  },
};

export const themeBase = extendTheme({
  components: {
    Input: {
      _hover: {},
    },
  },
  colors: {
    primary: {
      50: "#4A0754",
      100: "#841197",
      200: "#403CA0",
      300: "#625EC0",
      400: "#7A76DB",
      500: "#480E78",
    },
    // Redefining only one shade, rest of the color will remain same.
    amber: {
      400: "#d97706",
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: "light",
  },
});

// 2. Get the type of the CustomTheme
type CustomThemeType = typeof themeBase;

// 3. Extend the internal NativeBase Theme
declare module "native-base" {
  type ICustomTheme = CustomThemeType;
}
