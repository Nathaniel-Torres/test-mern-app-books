import Navbar from 'react-bootstrap/Navbar'

function Footer() {
  return (
    <Navbar collapseOnSelect expand="md" variant='dark' className='bg-dark mb-3'>
      <Container>
        <Navbar.Brand>@ 2023</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Footer