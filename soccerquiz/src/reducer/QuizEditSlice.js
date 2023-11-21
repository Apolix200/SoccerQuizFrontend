import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
    new: false,
}

export const quizEditSlice = createSlice({
    name: 'quizEdit',
    initialState,
    reducers: {
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
        addNewQuiz: (state, action) => {
            state.new = action.payload;
            state.value = {id: "", quizName: "Kvíz", questionAndAnswers: [{question: "Kérdés", answers: ["Válasz 1", "Válasz 2", "Válasz 3", "Válasz 4"], correctAnswer: 0}], isActive: false}
        },
    }
})

export const { setQuizEdit, setQuizName, setQuestion, setCorrectAnswer, addAnswer, setAnswer, deleteAnswer, addQna, deleteQna, addNewQuiz } = quizEditSlice.actions;

export default quizEditSlice.reducer