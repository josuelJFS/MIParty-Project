import axios, { AxiosResponse } from "axios";

type props = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

export default async function getAdressByCep(cep: string): Promise<AxiosResponse<props>> {
  try {
    const result = axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return result;
  } catch (error) {
    throw new Error(error + "");
  }
}
