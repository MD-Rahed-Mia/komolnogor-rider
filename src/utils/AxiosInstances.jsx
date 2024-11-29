import axios from "axios";

const apiUrl = import.meta.env.VITE_API_ENDPOINT;
const apiAuth = import.meta.env.VITE_API_AUTH_TOKEN;

const AxiosIntances = axios.create({
  baseURL: apiUrl,
  headers: {
    "x-auth-token": "komolnogor_api_kflsd0ke90112sd5fsv15d5s6s2662524sd32",
  },
});

export default AxiosIntances;
