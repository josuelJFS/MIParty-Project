import { AxiosResponse } from "axios";
import { Alert } from "react-native";
import { modelWaitingList } from "../../types/waitingList";
import axiosBase from "../apiAxios";

type propsChekclIst = {
  id: number;
  nome: string;
  email: string;
  img: string;
};

export type checkList = {
  result: Array<propsChekclIst>;
  status: boolean;
};

export default async function deleteCheckList(id: number): Promise<AxiosResponse> {
  try {
    const result = axiosBase.delete(`checklist/delete?id=${id}`);
    return result;
  } catch (error: any) {
    Alert.alert("erro com host");
    throw new Error(error);
  }
}
