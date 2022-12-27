import axios from "axios";

export default axios.create({
  // baseURL: 'http://localhost:1104/api/users',
  baseURL: "https://coding-crush.onrender.com/api/users",
});
