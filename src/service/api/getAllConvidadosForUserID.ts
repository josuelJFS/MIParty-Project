import { AxiosResponse } from "axios";
import { Alert } from "react-native";
import axiosBase from "../apiAxios";

type eventProps = {
  result: Array<{
    id: number;
    nome: string;
    email: string;
    img: string;
    usersId: number;
    name: string;
    cordenades: string;
  }>;
  status: boolean;
};

export default async function getAllForUserIdConvidados(usersId: number): Promise<AxiosResponse<eventProps>> {
  try {
    const result = axiosBase.get(`convidados/allForUserId?usersId=${usersId}`);
    return result;
  } catch (error: any) {
    Alert.alert("erro com host");
    throw new Error(error);
  }
}
