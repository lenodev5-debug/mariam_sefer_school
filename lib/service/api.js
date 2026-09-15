
import axios from "axios";
import { getToken } from "../tokens/token";
const baseURL = 'http://localhost:9999'

const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type' : 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
},
    (error) => {
        return Promise.reject(error);
    }
)

export default api;