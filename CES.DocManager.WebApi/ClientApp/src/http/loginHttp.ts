import axios from 'axios';

const $api = axios.create({
  headers: {
    'Access-Control-Allow-Origin': 'null',
    'Content-Type': 'application/json',
    'access-control-allow-headers': 'X-Custom-Header',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
  baseURL: process.env.NODE_ENV === 'production' ? process.env.REACT_API_URL_PRODUCTION : process.env.REACT_APP_API_URL,
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return config;
  }

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

export default $api;
