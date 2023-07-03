import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/AuthSlice'
import Spinner from '../components/Spinner'
import Row from 'react-bootstrap/Row'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  })

  const { name, email, password, cpassword } = formData

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

    if(password !== cpassword){
      toast.error('Passwords do not match')
    } else {
      const newUserData = {
        name,
        email,
        password,
      }

      dispatch(register(newUserData))
    }
  }

  if(isLoading){
    return <Spinner />
  }

  return (
    <Row className='h-100'>
      <div className='container'>
        <h1>Create an account</h1>
        <h5>Please fill in all the required fields.</h5>

        <form onSubmit={onSubmit}>

          <div className="form-group mb-2">
            <input
              className='form-control'
              type="text"
              name="name"
              id="name"
              placeholder='Enter your name'
              onChange={onChange} 
              data-bs-theme='dark'
            />
          </div>

          <div className="form-group mb-2">
            <input
              className='form-control'
              type="email"
              name="email"
              id="email"
              placeholder='Enter your email'
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
              placeholder='Enter your new password'
              onChange={onChange} 
              data-bs-theme='dark'
            />
          </div>

          <div className="form-group mb-4">
            <input
              className='form-control'
              type="password"
              name="cpassword"
              id="cpassword"
              placeholder='Confirm your new password'
              onChange={onChange} 
              data-bs-theme='dark'
            />
          </div>

          <div className="form-group">
            <button className='btn btn-dark'>Submit</button>
          </div>

        </form>
      </div>
    </Row>
  )
}

export default Register