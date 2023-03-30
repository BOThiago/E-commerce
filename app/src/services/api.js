import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4335", // Substitua pelo endereço da sua API
});

export default api;
