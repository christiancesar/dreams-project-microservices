import axios from 'axios';

const hotelApi = axios.create({
  baseURL: process.env.HOTEL_API_URL ?? 'http://localhost:3331',
});

export default hotelApi;