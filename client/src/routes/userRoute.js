import axios from 'axios';

export default axios.create({
  // baseURL: 'http://localhost:1104/api/users',
  baseURL: 'https://coding-crush.herokuapp.com/api/users',
});
