import axios from "axios";

axios.defaults.baseURL = "https://blog-backend-s7km.onrender.com";
// axios.defaults.baseURL = "http://localhost:5000/api";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  crossDomain: true,
});

export default api;
