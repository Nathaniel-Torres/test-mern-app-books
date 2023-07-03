import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/AuthSlice'
import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if(isError){
      toast.error(message)
    }

    if(isSuccess || user){
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password
    }

    dispatch(login(userData))
  }

  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      <div className='container'>
        <h1>Login to your account</h1>
        <h5>Please fill in all fields to login</h5>

        <form onSubmit={onSubmit}>

          <div className="form-group mb-2">
            <input
              className='form-control'
              type="email"
              name="email"
              id="email"
              placeholder='Email'
              onChange={onChange} 
              data-bs-theme='dark'
            />
          </div>

          <div className="form-group mb-2">
            <input
              className='form-control'
              type="password"
              name="password"
              id="password"
              placeholder='Password'
              onChange={onChange} 
              data-bs-theme='dark'
            />
          </div>

          <div className="form-group">
            <button type='submit' className='btn btn-dark'>Submit</button>
          </div>

        </form>
      </div>
    </>
  )
}

export default Login