import axios from 'axios'

const API_URL = 'https://test-mern-app-books-api.vercel.app/api/users/'

const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if(response.data){
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if(response.data){
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const logout = () => {
  localStorage.removeItem('user')
}

const AuthService = {
  register,
  logout,
  login,
}

export default AuthService