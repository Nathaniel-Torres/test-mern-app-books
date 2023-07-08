import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import BookService from './BookService'

const initialState = {
  books: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const addBook = createAsyncThunk('books/add', async (bookData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await BookService.add(bookData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const editBook = createAsyncThunk('books/edit', async (editBookData, thunkAPI) => {
  try {
    const { bookId, bookData } = editBookData
    const token = thunkAPI.getState().auth.user.token
    return await BookService.editThisBook(bookId, bookData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteBook = createAsyncThunk('books/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await BookService.deleteThisBook(id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const displayBooks = createAsyncThunk('books/display-all', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await BookService.viewAll(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const BookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
     .addCase(addBook.pending, (state) => {
      state.isLoading = true
     })
     .addCase(addBook.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.books.push(action.payload)
     })
     .addCase(addBook.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
     })
     .addCase(displayBooks.pending, (state) => {
      state.isLoading = true
     })
     .addCase(displayBooks.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.books = action.payload
     })
     .addCase(displayBooks.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
     })
     .addCase(deleteBook.pending, (state) => {
      state.isLoading = true
     })
     .addCase(deleteBook.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.books = state.books.filter((book) => book._id !== action.payload.id)
     })
     .addCase(deleteBook.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
     })
     .addCase(editBook.pending, (state) => {
      state.isLoading = true
     })
     .addCase(editBook.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.books = action.payload
     })
     .addCase(editBook.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
     })
  }
})

export const { reset } = BookSlice.actions
export default BookSlice.reducer