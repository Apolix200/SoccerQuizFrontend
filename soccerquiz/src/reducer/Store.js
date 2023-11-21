import { configureStore } from '@reduxjs/toolkit'
import quizReducer from './QuizSlice'
import quizEditReducer from './QuizEditSlice'
import loadingReducer from './LoadingSlice'
import quizResultReducer from './QuizResultSlice'

export const Store = configureStore({
  reducer: {
    quiz: quizReducer,
    quizEdit: quizEditReducer,
    quizResult: quizResultReducer,
    loading: loadingReducer,
  },
})