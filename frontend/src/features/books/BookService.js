import axios from 'axios'

const API_URL = 'https://test-mern-app-books-api.vercel.app/api/books/'

const add = async (bookData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL, bookData, config)

  return response.data
}

const viewAll = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

const editThisBook = async (bookId, bookData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.put(API_URL + bookId, bookData, config)

  return response.data
}

const deleteThisBook = async (bookId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.delete(API_URL + bookId, config)

  return response.data
}

const BookService = {
  add,
  viewAll,
  deleteThisBook,
  editThisBook,
}

export default BookService