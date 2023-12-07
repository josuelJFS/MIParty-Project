import { AxiosResponse } from "axios";
import { Alert } from "react-native";
import { modelWaitingList } from "../../types/waitingList";
import axiosBase from "../apiAxios";

type props = {
  result: Array<modelConvidados>;
  status: boolean;
};

type modelConvidados = {
  usersId: number;
  permissao?: number;
  categoria?: string;
  id_party: number;
};

export default async function postConvidados(objs: modelConvidados): Promise<AxiosResponse> {
  try {
    const result = axiosBase.post(`convidados/create`, objs);
    return result;
  } catch (error: any) {
    Alert.alert("erro com o host");
    throw new Error(error);
  }
}
