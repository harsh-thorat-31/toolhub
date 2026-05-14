import axios from "axios";

const api = axios.create({
    baseURL: "https://toolhub-backend-vtn5.onrender.com/api/",
});

export default api;