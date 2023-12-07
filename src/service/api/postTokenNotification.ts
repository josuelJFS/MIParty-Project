import { AxiosResponse } from "axios";
import { Alert } from "react-native";
import { modelWaitingList } from "../../types/waitingList";
import axiosBase from "../apiAxios";

type props = {
  result: Array<any>;
  status: boolean;
};

type modelTokenPush = {
  usersId?: number;
  tokenPush?: string;
};

export default async function postTokenNotification(objs: modelTokenPush): Promise<AxiosResponse> {
  try {
    const result = axiosBase.post(`tokenPush/create`, objs);
    return result;
  } catch (error: any) {
    Alert.alert("erro com o host");
    throw new Error(error);
  }
}
