import { createSlice } from '@reduxjs/toolkit'

const examSlice = createSlice({
    name: 'exam',
    initialState: {
        getExamById: null,
    },
    reducers: {
        setExam: (state, action) => {
            state.getExamById = action.payload
        }
    }
})

export const { setExam } = examSlice.actions
export default examSlice.reducer
