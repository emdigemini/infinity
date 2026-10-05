import axios from "axios";

const host = import.meta.env.VITE_API_URL;
const baseUrl = axios.create({
  baseURL: host,
  withCredentials: true
});

export default baseUrl;