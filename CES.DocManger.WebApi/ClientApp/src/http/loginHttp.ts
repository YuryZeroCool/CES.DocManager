import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const API_URL = 'https://localhost:5001';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
  const axiosConfig: AxiosRequestConfig = config;
  axiosConfig.headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
    'Access-Control-Allow-Origin': 'null',
    'Content-Type': 'application/json',
    'access-control-allow-headers': 'X-Custom-Header',
    'X-Requested-With': 'XMLHttpRequest',
  };
  return axiosConfig;
});

$api.interceptors.response.use((response: AxiosResponse) => response, async (error) => {
  const err = error as AxiosError;
  const originalRequest = err.config;
  if (err.response?.status === 401) {
    const email = localStorage.getItem('email');
    if (email) {
      try {
        const response = await axios.post<string>(`${API_URL}/account/updateTokenPair`, `${email}`, {
          validateStatus: (status) => status !== 401,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        if (response == null) throw Error('НЕ АВТОРИЗОВАН');
        localStorage.setItem('accessToken', response.data);
        return $api.request(originalRequest);
      } catch (e) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('email');
        localStorage.removeItem('userName');
      }
    }
  }
  throw new Error('s');
});

export default $api;
