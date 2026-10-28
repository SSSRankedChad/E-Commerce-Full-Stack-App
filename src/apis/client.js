import axios from 'axios';

// In production, requests stay on the same origin and Netlify proxies /api/* to
// the Render server (see netlify.toml), which keeps the session cookie first-party.
// During local development, REACT_APP_API_URL can point at a server directly
// (e.g. http://localhost:5000).
const API = axios.create({
   baseURL: process.env.NODE_ENV === "development" ? process.env.REACT_APP_API_URL || "" : "",
   withCredentials: true
});

export default API;
