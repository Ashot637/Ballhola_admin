import axios from "axios";

export const BASE_URL = "http://64.226.91.104/";

const instance = axios.create({
  baseURL: `${BASE_URL}api/v2`,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return config;
});

export default instance;
