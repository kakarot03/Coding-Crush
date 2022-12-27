import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://coding-crush.onrender.com/api/",
});
