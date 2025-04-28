export const BASE_URL = "http://localhost:7777/api";

export const REGISTER_USER = `${BASE_URL}/users/register`;
export const LOGIN_USER = `${BASE_URL}/users/login`;
export const LOGOUT_USER = `${BASE_URL}/users/logout`;
export const GET_USER_DETAILS = `${BASE_URL}/users/user`;

export const GET_ALL_EXAMS = `${BASE_URL}/exams/get-all-exams`;
export const ADD_EXAM = `${BASE_URL}/exams/add-exam`;
export const EDIT_EXAM = `${BASE_URL}/exams/edit-exam/`;
export const DELETE_EXAM = `${BASE_URL}/exams/delete-exam/`;

export const GET_ALL_QUESTIONS = `${BASE_URL}/exams/get-all-questions`;
export const ADD_QUESTION = `${BASE_URL}/exams/add-question`;
export const EDIT_QUESTION = `${BASE_URL}/exams/edit-question/`;
export const DELETE_QUESTION = `${BASE_URL}/exams/delete-question/`;

export const ADD_REPORT = `${BASE_URL}/reports/addReport`;
export const GET_ALL_REPORTS = `${BASE_URL}/reports/getAllReports`;
export const GET_REPORT_BY_USER_ID = `${BASE_URL}/reports/getReportByUserId`;
export const GET_ALL_REPORTS_WITH_SEARCH = `${BASE_URL}/reports/getAllReportsWithSearch`;
