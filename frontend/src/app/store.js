import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/AuthSlice'
import bookReducer from '../features/books/BookSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
  },
});
