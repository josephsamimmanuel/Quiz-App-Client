import axiosInstance from "./index";
import { ADD_REPORT, GET_ALL_REPORTS, GET_REPORT_BY_USER_ID, GET_ALL_REPORTS_WITH_SEARCH } from "../utils/constants";

export const addReport = async (reportData) => {
    try {
        const response = await axiosInstance.post(ADD_REPORT, reportData);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getAllReports = async () => {
    try {
        const response = await axiosInstance.get(GET_ALL_REPORTS );
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getAllReportsWithSearch = async (search) => {
    try {
        const response = await axiosInstance.post(GET_ALL_REPORTS_WITH_SEARCH, search);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};


export const getReportByUserId = async () => {
    try {
        const response = await axiosInstance.get(GET_REPORT_BY_USER_ID);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};



