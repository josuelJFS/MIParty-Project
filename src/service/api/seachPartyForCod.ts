import { AxiosResponse } from "axios";
import axiosBase from "../apiAxios";

type eventProps = {
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
    codInvite: string;
    categorias: Array<{ title: string }>;
  }>;
  status: boolean;
  isParticiping: boolean;
};

export default async function getPartyForCod(codInvite: string, usersId?: number): Promise<AxiosResponse<eventProps>> {
  try {
    const result = axiosBase.get(`evento/seachPartyForCod?codInvite=${codInvite}&usersId=${usersId}`);
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
}
