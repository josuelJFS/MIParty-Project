import { AxiosResponse } from "axios";
import { modelWaitingList } from "../../types/waitingList";
import axiosBase from "../apiAxios";

export type waitingList = {
  result: Array<modelWaitingList>;
  status: boolean;
};

export default async function insertWaitingList(objs: modelWaitingList): Promise<AxiosResponse<waitingList>> {
  try {
    const result = axiosBase.post(`waitingList/create`, objs);
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
}
