import axios from "axios";
import { BASE_URL } from "../utils/constants";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to add the token to requests
axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("token");
        console.log('Current token in request interceptor:', token); // Debug log
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('Authorization header set:', config.headers.Authorization); // Debug log
        }
        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error); // Debug log
        return Promise.reject(error);
    }
);

export default axiosInstance;

