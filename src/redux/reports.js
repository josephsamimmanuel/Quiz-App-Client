import { createSlice } from '@reduxjs/toolkit'

const reportsSlice = createSlice({
    name: 'reports',
    initialState: {
        addReport: null,
        getReportByUserId: null,
        getAllReportsData: null
    },
    reducers: {
        setAddReport: (state, action) => {
            state.addReport = action.payload
        },
        setGetReportByUserId: (state, action) => {
            state.getReportByUserId = action.payload
        },
        setGetAllReportsData: (state, action) => {
            state.getAllReportsData = action.payload
        }
    }
})

export const { setAddReport, setGetReportByUserId, setGetAllReportsData } = reportsSlice.actions
export default reportsSlice.reducer
