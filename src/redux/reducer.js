import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users";
import questionReducer from "./question";
import examReducer from "./exams";
import reportsReducer from "./reports";
import languageReducer from "./language";

const store = configureStore({
    reducer: {
        user: userReducer,
        question: questionReducer,
        exam: examReducer,
        reports: reportsReducer,
        language: languageReducer
    },
});

export default store;
