import { AxiosResponse } from "axios";
import { Alert } from "react-native";
import { modelWaitingList } from "../../types/waitingList";
import axiosBase from "../apiAxios";

export type waitingList = {
  result: Array<modelWaitingList>;
  status: boolean;
};

export default async function deleteWaitingList(
  usersID: number,
  idParty: number,
  notification?: boolean,
): Promise<AxiosResponse<waitingList>> {
  try {
    const result = axiosBase.delete(
      `waitingList/delete?usersID=${usersID}&idParty=${idParty}&notification=${notification}`,
    );
    return result;
  } catch (error: any) {
    Alert.alert("erro com host");
    throw new Error(error);
  }
}
