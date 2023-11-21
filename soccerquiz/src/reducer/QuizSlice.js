import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
}

export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setQuiz: (state, action) => {
            state.value = action.payload
        },
        setCorrectAnswer: (state, action) => {
            state.value.questionAndAnswers[action.payload.currentPage].correctAnswer = action.payload.index
        },
    }
})

export const { setQuiz, setCorrectAnswer } = quizSlice.actions;

export default quizSlice.reducer