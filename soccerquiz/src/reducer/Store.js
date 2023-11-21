import { configureStore } from '@reduxjs/toolkit'
import quizReducer from './QuizSlice'
import quizEditReducer from './QuizEditSlice'
import loadingReducer from './LoadingSlice'

export const Store = configureStore({
  reducer: {
    quiz: quizReducer,
    quizEdit: quizEditReducer,
    loading: loadingReducer,
  },
})