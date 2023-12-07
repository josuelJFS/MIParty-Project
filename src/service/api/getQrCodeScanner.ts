import { AxiosResponse } from "axios";
import { Alert } from "react-native";
import axiosBase from "../apiAxios";

type eventProps = {
  result: Array<{
    id: number;
    nome: string;
    email: string;
    img: string;
    categoria: string;
  }>;
  status: boolean;
  mensage: string;
};

export default async function getQrCode(email: string, idParty: number): Promise<AxiosResponse<eventProps>> {
  try {
    const result = axiosBase.get(`convidados/qrscenner?email=${email}&idParty=${idParty}`);
    return result;
  } catch (error: any) {
    Alert.alert("erro com host");
    throw new Error(error);
  }
}
