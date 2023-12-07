import { AxiosResponse } from "axios";
import { Alert } from "react-native";
import { modelWaitingList } from "../../types/waitingList";
import axiosBase from "../apiAxios";

type modelCheckList = {
  id?: number;
  id_party: number;
  userID: number;
};

export default async function postCheckList(objs: modelCheckList): Promise<AxiosResponse> {
  try {
    const result = axiosBase.post(`checklist/create`, objs);
    return result;
  } catch (error: any) {
    Alert.alert("erro com o host");
    throw new Error(error);
  }
}
