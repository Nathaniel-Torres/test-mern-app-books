import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/AuthSlice'
import Spinner from '../components/Spinner'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import UpdateNotice from '../components/UpdateNotice'

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

      <Container>
        <UpdateNotice />
        <Row className='align-items-center'>

          <Col className='d-none d-md-grid' md='4'>
            <Container className='d-flex justify-content-center align-items-center'>
              <img src="../assets/images/login.svg" alt="..." />
            </Container>
          </Col>

          <Col md='8'>
            <Form onSubmit={onSubmit}>

              <Row className='text-center'>
                <h1 className='lead fw-bold'>Login to your account</h1>
                <p>Please fill in the require fields to login.</p>
              </Row>

            </Form>
          </Col>

        </Row>
      </Container>

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