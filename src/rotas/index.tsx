import React, { useEffect, useState } from "react";
import Livre from "./livre";
import Logado from "./logado";
import { useAutenticacaoContext } from "../contexts/autenticacao";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Rotas = () => {
  const { acesso } = useAutenticacaoContext();

  if (acesso) {
    // eslint-disable-next-line no-var
    var RotasUser = Logado;
  } else {
    // eslint-disable-next-line no-var
    var RotasUser = Livre;
  }
  return <RotasUser />;
};

export default Rotas;
