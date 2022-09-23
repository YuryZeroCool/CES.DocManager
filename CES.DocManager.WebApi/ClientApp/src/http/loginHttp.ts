import axios from 'axios';

export const API_URL = 'https://ces-docmanager.site';

const $api = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
    'Access-Control-Allow-Origin': 'null',
    'Content-Type': 'application/json',
    'access-control-allow-headers': 'X-Custom-Header',
    'X-Requested-With': 'XMLHttpRequest',
  },
  baseURL: API_URL,
});

export default $api;
