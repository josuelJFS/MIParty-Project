import { Box, Button, Flex } from "native-base";
import React, { useEffect, useState } from "react";

type props = {
  onChage?: (e: { lista: boolean; Convidados: boolean }) => void;
};

const Tab: React.FC<props> = ({ onChage }) => {
  const [active, setActive] = useState({ lista: true, Convidados: false });
  const activeNow = { color: "muted.600", fontFamily: "Roboto_500Medium" };
  const disable = { color: "muted.400", fontFamily: "Roboto_500Medium" };
  useEffect(() => {
    onChage && onChage(active);
  }, [active]);
  return (
    <Flex h={10} direction="row">
      <Button
        onPress={() => setActive((props) => ({ lista: true, Convidados: false }))}
        justifyContent="center"
        alignItems="center"
        _text={active.lista ? activeNow : disable}
        borderBottomRadius="lg"
        flex={1}
        bgColor={active.lista ? "muted.50" : "muted.200"}
      >
        Lista de Espera
      </Button>
      <Button
        onPress={() => setActive((props) => ({ ...props, Convidados: true, lista: false }))}
        justifyContent="center"
        alignItems="center"
        _text={active.Convidados ? activeNow : disable}
        borderBottomRadius="lg"
        flex={1}
        bgColor={active.Convidados ? "muted.50" : "muted.200"}
      >
        Convidados
      </Button>
    </Flex>
  );
};

export default Tab;
