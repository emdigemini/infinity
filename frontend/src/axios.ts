import axios from "axios";

const baseUrl = axios.create({
  baseURL: '/api',
  withCredentials: true
});

export default baseUrl;