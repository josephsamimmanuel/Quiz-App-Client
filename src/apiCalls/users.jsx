import axiosInstance from "./index";
import { REGISTER_USER, LOGIN_USER, LOGOUT_USER } from "../utils/constants";

export const registerUser = async (userData) => {
    try {
        const response = await axiosInstance.post(REGISTER_USER, userData);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axiosInstance.post(LOGIN_USER, userData);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const logoutUser = async () => {
    try {
        const response = await axiosInstance.post(LOGOUT_USER);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};