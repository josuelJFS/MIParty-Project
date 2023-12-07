import { AxiosResponse } from "axios";
import axiosBase from "../apiAxios";

export type eventProps = {
  result: Array<{
    id: number;
    name: string;
    date: string;
    maxGuests: string;
    address: string;
    city: string;
    state: string;
    postalCod: string;
    valueParty: string;
    usersId: number;
    cordenades: { latitude: any; longitude: any };
    time: string | number;
    codInvite: number;
    categorias: Array<{ title: string }>;
    obs: string;
  }>;
  status: boolean;
};

export default async function getEventById(usersId: number): Promise<AxiosResponse<eventProps>> {
  try {
    const result = axiosBase.get(`evento/all?usersId=` + usersId);
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
}
