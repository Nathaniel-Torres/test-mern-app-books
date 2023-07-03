import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/AuthSlice'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  const navLink = (e) => {
    navigate(e.target.id)
  }

  return (
    <Navbar collapseOnSelect expand="md" variant='dark' className='bg-dark mb-3'>
      <Container>
        <Navbar.Brand id='/' onClick={navLink}>Book Record</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-collapsible" />
        <Navbar.Collapse id="navbar-collapsible">
          <Nav className="ms-auto">
              
            {user ? (
              <>
                <Navbar.Text>Signed in as: {user.name}</Navbar.Text>
                <Nav.Link onClick={onLogout}>
                  <i className='bi bi-arrow-right'></i>
                  &nbsp;&nbsp;Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link id="/login" onClick={navLink}>
                  <i className="bi bi-arrow-left"></i>
                  &nbsp;&nbsp;Login
                </Nav.Link>
                <Nav.Link id="/register" onClick={navLink}>
                  <i className="bi bi-person"></i>
                  &nbsp;&nbsp;Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header