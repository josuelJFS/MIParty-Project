import { AxiosResponse } from "axios";
import { Alert } from "react-native";
import { modelWaitingList } from "../../types/waitingList";
import axiosBase from "../apiAxios";

type props = {
  result: Array<modelConvidados>;
  status: boolean;
};

type modelConvidados = {
  id: number;
  permissao: number;
  categoria: string;
};

export default async function putConvidados(objs: modelConvidados): Promise<AxiosResponse> {
  try {
    const result = axiosBase.put(`convidados/update`, objs);
    return result;
  } catch (error: any) {
    Alert.alert("erro com o host");
    throw new Error(error);
  }
}
