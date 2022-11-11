import axios from 'axios';

const flightApi = axios.create({
  baseURL: 'http://localhost:3332',
});

export default flightApi;