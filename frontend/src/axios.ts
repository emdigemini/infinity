import axios from "axios";

const baseUrl = axios.create({
  baseURL: 'http://localhost:5001/api',
  withCredentials: true
});

export default baseUrl;