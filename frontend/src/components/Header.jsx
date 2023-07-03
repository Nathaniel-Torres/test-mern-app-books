import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/AuthSlice'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  return (
      <Navbar expand="md" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href='/'>Personal Book Archive</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-collapsible" />
          <Navbar.Collapse id="navbar-collapsible">
            <Nav className="ms-auto">
              
              {user ? (
                <Nav.Link onClick={onLogout}>
                  <i className='bi bi-arrow-right'></i>
                  Logout
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link href="/login">
                    <i className="bi bi-arrow-left"></i>
                    Login
                  </Nav.Link>
                  <Nav.Link href="/register">
                    <i className="bi bi-person"></i>
                    Register
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