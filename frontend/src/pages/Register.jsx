import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/AuthSlice'
import Spinner from '../components/Spinner'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'

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
    <Container className='h-100'>
      <Row className='mb-3 justify-content-center'>
        <Col md='6'>
          <Container className='bg-light rounded-3 py-4 mb-4'>
            <Form onSubmit={onSubmit}>
              <Row className='text-center mb-2'>
                <i className='login-logo bi bi-person-badge cursor-pointer'></i>
                <h1 className='fw-bold'>Create an account</h1>
                <p>To start using this app, create an account if you do not have one.</p>
              </Row>
              <Container className='mb-3'>
                <InputGroup>
                  <InputGroup.Text id='name-label' className='bg-light'><i className='bi bi-person'></i></InputGroup.Text>
                  <Form.Control aria-describedby="name-label" type='text' name='name' id='name' placeholder='Enter your name' onChange={onChange} />
                </InputGroup>
              </Container>
              <Container className='mb-3'>
                <InputGroup>
                  <InputGroup.Text id='email-label' className='bg-light'><i className='bi bi-envelope-fill'></i></InputGroup.Text>
                  <Form.Control aria-describedby="email-label" type='email' name='email' id='email' placeholder='Enter your email' onChange={onChange} />
                </InputGroup>
              </Container>
              <Container className='mb-3'>
                <InputGroup>
                  <InputGroup.Text id='password-label' className='bg-light'><i className='bi bi-lock'></i></InputGroup.Text>
                  <Form.Control aria-describedby="password-label" type='password' name='password' id='password' placeholder='Enter your new password' onChange={onChange} />
                </InputGroup>
              </Container>
              <Container className='mb-3'>
                <InputGroup>
                  <InputGroup.Text id='cpassword-label' className='bg-light'><i className='bi bi-lock-fill'></i></InputGroup.Text>
                  <Form.Control aria-describedby="cpassword-label" type='password' name='cpassword' id='password' placeholder='Confirm your new password' onChange={onChange} />
                </InputGroup>
              </Container>
              <Form.Group className='mb-3'>
                <Container className='d-flex justify-content-center align-items-center'>
                  <Button type='submit' className='w-100' variant='dark'>Submit</Button>
                </Container>
              </Form.Group>
            </Form>
          </Container>
        </Col>
      </Row>
    </Container>
  )
}

export default Register