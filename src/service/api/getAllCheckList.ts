import { AxiosResponse } from "axios";
import { Alert } from "react-native";
import axiosBase from "../apiAxios";

type checklist = {
  result: Array<{
    id: number;
    nome: string;
    email: string;
    img: string;
    idChecklist: number;
  }>;
  status: boolean;
};

export default async function getAllCheckList(idParty: number): Promise<AxiosResponse<checklist>> {
  try {
    const result = axiosBase.get(`checklist/list?idParty=${idParty}`);
    return result;
  } catch (error: any) {
    Alert.alert("erro com host");
    throw new Error(error);
  }
}
