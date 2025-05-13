import axios from "axios";
import { BASE_URL } from "../utils/constants";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
    },
});

export default axiosInstance;

