import axios from 'axios';

const API = axios.create({
   baseURL: "https://e-commerce-app-p5as.onrender.com/api",
   withCredentials: true
});

export default API;
