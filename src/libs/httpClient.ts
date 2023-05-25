import Axios, { AxiosResponse } from "axios";

export const httpClient = Axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
});

httpClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Only return response data
    return response.data;
  },
  function (error) {
    // Do something with response error   
    return Promise.reject(error);
  }
);