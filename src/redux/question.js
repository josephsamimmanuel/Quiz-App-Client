import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
    name: "question",
    initialState: {
        questions: [],
        allQuestions: [],
    },
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
        setAllQuestions: (state, action) => {
            state.allQuestions = action.payload;
        },
    },
});

export const { setQuestions, setAllQuestions } = questionSlice.actions;
export default questionSlice.reducer;
