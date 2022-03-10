import axios, { AxiosRequestConfig } from "axios";

export const BaseURL = "https://localhost:5001";

const $api = axios.create({ withCredentials: true, baseURL: BaseURL });

$api.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    config.validateStatus = (status) => {
      return status < 500;
    };

    const token = document.cookie.split(";").filter(x => x === `${encodeURI("token")}`);
    console.log(token)
    config.headers = {
      Authorization: `Bearer${token}`,
      "Access-Control-Allow-Origin": "null",
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-control-allow-headers": "X-Custom-Header",
    };
    return config;
  }
);

export default $api;
