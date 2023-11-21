import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
}

export const quizResultSlice = createSlice({
    name: 'quizResult',
    initialState,
    reducers: {
        setQuizResult: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setQuizResult } = quizResultSlice.actions;

export default quizResultSlice.reducer