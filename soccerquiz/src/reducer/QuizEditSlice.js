import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
}

export const quizEditSlice = createSlice({
    name: 'quizEdit',
    initialState,
    reducers: {
        addQuizEdit: (state, action) => {
            state.value = action.payload.quiz
        },
        setQuizEdit: (state, action) => {
            state.value = action.payload
        },
        setQuizName: (state, action) => {
            state.value.quizName = action.payload
        },
        setQuestion: (state, action) => {
            state.value.questionAndAnswers[action.payload.currentPage].question = action.payload.question
        },
        setCorrectAnswer: (state, action) => {
            state.value.questionAndAnswers[action.payload.currentPage].correctAnswer = action.payload.index
        },
        addAnswer: (state, action) => {
            state.value.questionAndAnswers[action.payload.currentPage].answers.push(action.payload.answer);
        },
        setAnswer:(state, action) => {
            state.value.questionAndAnswers[action.payload.currentPage].answers[action.payload.index] = action.payload.answer
        },
        deleteAnswer: (state, action) => {
            state.value.questionAndAnswers[action.payload.currentPage].answers.splice(action.payload.index, 1);
        },
        addQna: (state, action) => {
            state.value.questionAndAnswers.splice(action.payload.currentPage, 0, action.payload.qna);
        },
        deleteQna: (state, action) => {
            state.value.questionAndAnswers.splice(action.payload, 1);
        },
    }
})

export const { addQuizEdit, setQuizEdit, setQuizName, setQuestion, setCorrectAnswer, addAnswer, setAnswer, deleteAnswer, addQna, deleteQna } = quizEditSlice.actions;

export default quizEditSlice.reducer