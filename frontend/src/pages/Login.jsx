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
import InputGroup from 'react-bootstrap/InputGroup'
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

  const [isShowed, setShow] = useState({
    type: 'password',
    icon: 'bi-eye',
    bg: 'bg-secondary',
  })

  const showPassword = () => {
    if(isShowed.type === 'password'){
      setShow({
        type: 'text',
        icon: 'bi-eye-fill',
        bg: 'bg-primary',
      })
    } else {
      setShow({
        type: 'password',
        icon: 'bi-eye',
        bg: 'bg-secondary',
      })
    }
  }

  if(isLoading){
    return <Spinner />
  }

  return (
      <Container className='h-100'>
        <Row className='mb-3 justify-content-center'>

          <Col md='6'>
            <Container className='bg-light rounded-3 py-4 mb-4'>
              <Form onSubmit={onSubmit}>

                <Row className='text-center mb-2'>
                  <i className='login-logo bi bi-box-arrow-in-right cursor-pointer'></i>
                  <h1 className='fw-bold'>Login to your account</h1>
                  <p>Please fill in the require fields to login.</p>
                </Row>

                <Container className='mb-3'>
                  <InputGroup>
                    <InputGroup.Text id='email-label' className='bg-light'><i className='bi bi-person-circle'></i></InputGroup.Text>
                    <Form.Control aria-describedby="email-label" type='email' name='email' id='email' placeholder='Enter your email' onChange={onChange} />
                  </InputGroup>
                </Container>

                <Container className='mb-5'>
                  <InputGroup>
                    <InputGroup.Text id='password-label' className='bg-light'><i className='bi bi-lock-fill'></i></InputGroup.Text>
                    <Form.Control aria-describedby="password-label" type={isShowed.type} name='password' id='password' placeholder='Enter your password' onChange={onChange} />
                    <InputGroup.Text onClick={showPassword} className={'cursor-pointer text-light ' + isShowed.bg}>
                      <i className={'bi ' + isShowed.icon}></i>
                    </InputGroup.Text>
                  </InputGroup>
                </Container>

                <Form.Group className='mb-3'>
                  <Container className='d-flex justify-content-center align-items-center'>
                    <Button type='submit' className='w-100' variant='dark'>Submit</Button>
                  </Container>
                </Form.Group>

              </Form>
            </Container>
            <UpdateNotice />
          </Col>

        </Row>
      </Container>
  )
}

export default Login