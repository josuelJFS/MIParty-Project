import axios, { AxiosResponse } from "axios";

type props = {
  lat: number;
  lon: number;
};

export default async function getCordenades(cep: string): Promise<AxiosResponse<Array<props>> | undefined> {
  try {
    const result = axios.get(`https://nominatim.openstreetmap.org/search.php?postalcode=${cep}&format=jsonv2`);
    return result;
    // eslint-disable-next-line no-empty
  } catch (error) {}
}
