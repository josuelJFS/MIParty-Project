import {
  Box,
  Container,
  FormControl,
  Input as Inp,
  Text,
  IInputProps,
  Select as SelectBase,
  ISelectProps,
  ISelectItemProps,
} from "native-base";
import { ISelectComponentType } from "native-base/lib/typescript/components/primitives/Select";
import React from "react";
import { InputTimeExpo } from "./style";
export function Input({ ...rest }: IInputProps) {
  return (
    <Inp
      color="light.500"
      size="md"
      type="text"
      placeholder="ex: Casamento"
      fontFamily="Roboto_400Regular"
      bgColor="light.50"
      height={12}
      {...rest}
      _focus={{ bgColor: "light.50", borderColor: "purple.500" }}
    />
  );
}

export function Seach({ ...rest }: IInputProps) {
  return (
    <Inp
      color="light.500"
      size="md"
      type="text"
      fontFamily="Roboto_400Regular"
      bgColor="light.50"
      height={12}
      {...rest}
      _focus={{ bgColor: "light.50", borderColor: "purple.500" }}
    />
  );
}

interface propsSelect extends ISelectProps {
  itens: Array<{ label: string; value: string }>;
}

export const Select: React.FC<propsSelect> = ({ itens, ...rest }) => {
  return (
    <SelectBase
      color="light.500"
      size="md"
      placeholder="ex: Casamento"
      fontFamily="Roboto_400Regular"
      bgColor="light.50"
      height={12}
      {...rest}
    >
      {itens.map((e, i) => (
        <SelectBase.Item key={i} label={e.label} value={e.value} />
      ))}
    </SelectBase>
  );
};

export const InputTime = () => {
  return (
    <InputTimeExpo
      testID="dateTimePicker"
      value={new Date()}
      minimumDate={new Date()}
      is24Hour={true}
      display="default"
      onChange={(e) => console.log(e)}
    />
  );
};
