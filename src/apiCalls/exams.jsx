import axiosInstance from "./index";
import { GET_ALL_EXAMS, ADD_EXAM, EDIT_EXAM, DELETE_EXAM, GET_ALL_QUESTIONS, ADD_QUESTION, EDIT_QUESTION, DELETE_QUESTION } from "../utils/constants";

export const getAllExams = async () => {
    try {
        const response = await axiosInstance.get(GET_ALL_EXAMS);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const addExam = async (examData) => {
    try {
        const response = await axiosInstance.post(ADD_EXAM, examData);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const editExam = async (id, examData) => {
    try {
        const response = await axiosInstance.patch(EDIT_EXAM + id, examData);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const deleteExam = async (examId) => {
    try {
        const response = await axiosInstance.delete(DELETE_EXAM + examId);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getAllQuestions = async () => {
    try {
        const response = await axiosInstance.get(GET_ALL_QUESTIONS);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
export const addQuestion = async (examId, questionData) => {
    try {
        const response = await axiosInstance.post(ADD_QUESTION, { examId, ...questionData });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const editQuestion = async (questionId, questionData) => {
    try {
        const response = await axiosInstance.patch(EDIT_QUESTION + questionId, questionData);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const deleteQuestion = async (questionId) => {
    try {
        const response = await axiosInstance.delete(DELETE_QUESTION + questionId);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};