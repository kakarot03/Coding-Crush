import axios from "axios";

export default axios.create({
  baseURL: "https://coding-crush.onrender.com/api/auth",
  // baseURL: 'http://localhost:1104/api/auth',
});
