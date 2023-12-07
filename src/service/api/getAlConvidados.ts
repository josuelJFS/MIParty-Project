import { AxiosResponse } from "axios";
import { Alert } from "react-native";
import axiosBase from "../apiAxios";

type eventProps = {
  result: Array<{
    idConvite: number;
    nome: string;
    email: string;
    img: string;
    usersId: number;
  }>;
  status: boolean;
};

export default async function getAllConvidados(idParty: number): Promise<AxiosResponse<eventProps>> {
  try {
    const result = axiosBase.get(`convidados/all?id_party=${idParty}`);
    return result;
  } catch (error: any) {
    Alert.alert("erro com host");
    throw new Error(error);
  }
}
