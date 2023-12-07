import React, { Children } from "react";
import { Button, IButtonProps } from "native-base";

const ButtonSimple = ({ children, ...rest }: IButtonProps) => {
  return (
    <Button
      bgColor="primary.500"
      width="90%"
      size="lg"
      _text={{ fontFamily: "Roboto_500Medium", fontSize: "lg" }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export { ButtonSimple };
