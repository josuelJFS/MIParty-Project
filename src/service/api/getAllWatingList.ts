import { AxiosResponse } from "axios";
import { Alert } from "react-native";
import axiosBase from "../apiAxios";

type eventProps = {
  result: Array<{
    idWaitingList: number;
    nome: string;
    email: string;
    img: string;
    usersId: number;
    pendent?: boolean;
  }>;
  status: boolean;
};

export default async function getAllWaiting(idParty: number): Promise<AxiosResponse<eventProps>> {
  try {
    const result = axiosBase.get(`waitingList/all?idParty=${idParty}`);
    return result;
  } catch (error: any) {
    Alert.alert("erro com host");
    throw new Error(error);
  }
}
