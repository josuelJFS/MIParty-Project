import { AxiosResponse } from "axios";
import axiosBase from "../apiAxios";

type props = {
  name: string;
  date: string;
  maxGuests: string;
  address: string;
  city: string;
  state: string;
  postalCod: string;
  valueParty: string;
  usersId: number;
  cordenates: { latitude: boolean; longitude: boolean };
  time: string | number;
};

export default async function updateEvent(objs: props): Promise<AxiosResponse<Array<props>>> {
  try {
    const result = axiosBase.put(`evento/update`, objs);
    return result;
  } catch (error) {
    throw new Error(error + "");
  }
}
