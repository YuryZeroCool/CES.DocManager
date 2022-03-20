import axios, { AxiosRequestConfig } from 'axios';

export const API_URL = 'https://localhost:5001';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
  const axiosConfig: AxiosRequestConfig = config;
  if (axiosConfig.headers !== undefined) {
    axiosConfig.headers.Authorization = `Bearer${localStorage.getItem('token') || ''}`;
  }
  return axiosConfig;
  // config.validateStatus = (status) => {
  //   return status < 500;
  // };

  // const token = document.cookie.split(';').filter(x => x === `${encodeURI('token')}`);
  // console.log(token);
  // config.headers = {
  //   Authorization: `Bearer${token}`,
  //   "Access-Control-Allow-Origin": "null",
  //   Accept: "application/json",
  //   "Content-Type": "application/json",
  //   "access-control-allow-headers": "X-Custom-Header",
  // };
  // return config;
});

export default $api;
