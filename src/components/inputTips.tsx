import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
  DatePickerIOSComponent,
  KeyboardTypeOptions,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  Platform,
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useAutenticacaoContext } from "../contexts/autenticacao";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Input } from "./input";
import { dataFormatBR, time } from "../functions/formats";

type propsInputWithLabel = {
  secureTextEntry?: boolean;
  placeholder?: string;
  style?: React.CSSProperties;
  styleBoxInput?: ViewStyle;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (e: string) => void;
  value?: any;
  maxLength?: number;
  onBlur?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined;
  onFocus?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined;
  validate?: boolean;
  onChangeDate?: (e: string) => void;
};

type propsInputWithDate = {
  secureTextEntry?: boolean;
  placeholder?: string;
  style?: React.CSSProperties;
  styleBoxInput?: ViewStyle;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (e: string) => void;
  value?: any;
  type: "date" | "time";
  maxLength?: number;
  onBlur?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined;
  onFocus?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined;
  validate?: boolean;
  onChangeDate?: (e: string) => void;
};

type propsSelect = {
  onChange?: (e: string) => void | undefined;
  value?: string;
  itens: Array<{
    label: string;
    value: number | string;
  }>;
};

const InputWithLabelDate: React.FC<propsInputWithDate> = ({
  secureTextEntry = false,
  placeholder,
  styleBoxInput,
  keyboardType,
  onChangeText,
  value,
  maxLength,
  onBlur,
  onFocus,
  type,
  validate,
  onChangeDate,
}) => {
  const { theme } = useAutenticacaoContext();
  const [date, setDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<any>("date");
  const [show, setShow] = useState<boolean>(false);

  const styles = StyleSheet.create({
    conteinerInput: {
      width: "84%",
      marginTop: 15,
    },
    input: {
      width: "100%",
      height: wp(12),
      fontSize: 16,
      backgroundColor: theme.itemColor,
      borderRadius: 7,
      color: theme.iconColor,
      fontFamily: "Roboto_900Black",
      paddingLeft: 20,
    },

    label: {
      color: theme.iconColor,
      fontFamily: "Roboto_400Regular",
      fontWeight: "bold",
      marginLeft: 5,
    },
  });

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    let dateBr: any = "";
    type == "date"
      ? (dateBr = dataFormatBR(new Date(event.nativeEvent.timestamp)))
      : (dateBr = time(new Date(event.nativeEvent.timestamp)));

    onChangeDate && onChangeDate(dateBr);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode(type);
  };

  return (
    <>
      <Input
        type="text"
        onBlur={onBlur}
        onFocus={showDatepicker}
        maxLength={maxLength}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      ></Input>
      {show && (
        <>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            minimumDate={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        </>
      )}
    </>
  );
};

const InputSelect: React.FC<propsSelect> = ({ onChange, value = "", itens }) => {
  const pickerRef = useRef(null);
  const { theme } = useAutenticacaoContext();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(value);

  useEffect(() => {
    onChange && onChange(selectedLanguage);
  }, [selectedLanguage]);

  const styles = StyleSheet.create({
    conteinerInput: {
      width: "84%",
      marginTop: 15,
    },
    input: {
      width: "100%",
      height: hp(8),
      fontSize: 16,
      backgroundColor: theme.itemColor,
      borderRadius: 7,
      color: theme.tituloColor,
      fontFamily: "Roboto_900Black",
      paddingLeft: 20,
      marginTop: wp(7),
      borderColor: "#f4f4f4",
      fontWeight: "900",
    },

    label: {
      color: theme.tituloColor,
      fontFamily: "Roboto_900Black",
    },
  });

  return (
    <View style={[styles.conteinerInput]}>
      <Picker
        ref={pickerRef}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
        style={styles.input}
      >
        {itens.map((e: any) => (
          <Picker.Item key={e.value} label={e.label} value={e.value} />
        ))}
      </Picker>
    </View>
  );
};

export { InputWithLabelDate, InputSelect };
