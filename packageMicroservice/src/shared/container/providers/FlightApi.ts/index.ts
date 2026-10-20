import axios from 'axios';

const flightApi = axios.create({
  baseURL: process.env.FLIGHT_API_URL ?? 'http://localhost:3332',
});

export default flightApi;