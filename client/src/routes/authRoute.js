import axios from 'axios';

export default axios.create({
  baseURL: 'https://coding-crush.herokuapp.com/api/auth',
  // baseURL: 'http://localhost:1104/api/auth',
});
