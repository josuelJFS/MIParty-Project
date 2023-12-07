import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
const api = axios.create({
  baseURL: "http://3.216.31.1:3333/",
});

api.interceptors.request.use(async (config: any) => {
  try {
    const token = await AsyncStorage.getItem("@token");

    //config.headers.token = token;

    if (token) {
      config.headers.token = token;
    }

    return config;
  } catch (err) {
    //alert(err);
  }
});

export default api;
