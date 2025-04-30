import axiosInstance from "./index";
import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, GET_USER_DETAILS, GET_USER_PROFILE, UPDATE_USER_PROFILE } from "../utils/constants";

export const registerUser = async (userData) => {
    try {
        const response = await axiosInstance.post(REGISTER_USER, userData);
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
        throw error;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axiosInstance.post(LOGIN_USER, userData);
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
        throw error;
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

export const getUserDetails = async () => {
    try {
        const response = await axiosInstance.get(GET_USER_DETAILS);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getUserProfile = async () => {
    try {
        const response = await axiosInstance.get(GET_USER_PROFILE);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const updateUserProfile = async (userData) => {
    try {
        const response = await axiosInstance.patch(UPDATE_USER_PROFILE, userData);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};