import axios from 'axios';

const API = axios.create({
   baseURL: "https://e-commerce-full-stack-app.netlify.app",
   withCredentials: true
});

export default API;
