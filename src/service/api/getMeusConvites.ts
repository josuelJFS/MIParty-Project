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
    nameParty: string;
    address: string;
    city: string;
    state: string;
    date: Date;
    time: Date;
  }>;
  status: boolean;
};

export default async function getMeusConvites(usersId: number | undefined): Promise<AxiosResponse<eventProps>> {
  try {
    const result = axiosBase.get(`convidados/MeusConvites?usersId=${usersId}`);
    return result;
  } catch (error: any) {
    Alert.alert("erro com host");
    throw new Error(error);
  }
}
