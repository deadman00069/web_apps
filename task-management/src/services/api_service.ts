import axios from "axios";
import AppConfig from "../config/AppConfig";

const axiosInstance = axios.create({
  baseURL: AppConfig().baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
