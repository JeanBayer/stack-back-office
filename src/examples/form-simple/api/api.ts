import axios from 'axios';

const BASE_URL = import.meta.env.PUBLIC_BASE_URL_BACK;
export const api = axios.create({
  baseURL: BASE_URL,
});
