import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:1104/api/",
});
