import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const ROLE_ERROR = 'Не удалось определить роль пользователя';

type RetryConfig = AxiosRequestConfig & { isRetry?: boolean };

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

let refreshPromise: Promise<string> | null = null;

function isExpiredSession(error: AxiosError): boolean {
  if (error.response?.status === 401) {
    return true;
  }

  const data = error.response?.data as { errorMessage?: string } | undefined;
  return data?.errorMessage === ROLE_ERROR;
}

async function refreshAccessToken(): Promise<string> {
  const email = localStorage.getItem('email');
  if (!email) {
    throw new Error('Нет email');
  }

  const baseURL = ($api.defaults.baseURL ?? '').replace(/\/$/, '');
  const response = await axios.post<string>(
    `${baseURL}/account/updateTokenPair`,
    email,
    {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    },
  );

  if (typeof response.data !== 'string' || response.data.length === 0) {
    throw new Error('Пустой токен');
  }

  localStorage.setItem('accessToken', response.data);
  return response.data;
}

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

$api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as RetryConfig | undefined;
    const url = original?.url ?? '';
    if (!original || original.isRetry || url.includes('updateTokenPair') || url.includes('login')) {
      return Promise.reject(error);
    }

    if (!isExpiredSession(error)) {
      return Promise.reject(error);
    }

    original.isRetry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }

      const token = await refreshPromise;
      original.headers = {
        ...original.headers,
        Authorization: `Bearer ${token}`,
      };
      return await $api(original);
    } catch {
      return Promise.reject(error);
    }
  },
);

export default $api;
