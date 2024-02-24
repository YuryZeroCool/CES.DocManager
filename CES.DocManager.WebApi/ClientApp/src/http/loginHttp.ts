import axios from 'axios';

const $api = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
    'Access-Control-Allow-Origin': 'null',
    'Content-Type': 'application/json',
    'access-control-allow-headers': 'X-Custom-Header',
    'X-Requested-With': 'XMLHttpRequest',
  },
  baseURL: process.env.REACT_APP_API_URL,
});

export default $api;
