import Container from 'react-bootstrap/Container'

function Spinner() {
  return (
    <Container className='d-flex my-3 justify-content-center align-items-center vh-70'>
      <div className="spinner-border login-logo" role='status'>
        <span className="visually-hidden">Loading...</span>
      </div>
    </Container>
  )
}

export default Spinner