import axios from 'axios';

const hotelApi = axios.create({
  baseURL: 'http://localhost:3331',
});

export default hotelApi;