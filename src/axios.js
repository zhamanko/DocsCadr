// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // бекенд URL
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
