import Container from 'react-bootstrap/Container'

function Spinner() {
  return (
    <Container className='d-flex justify-content-center align-items-center h-100'>
      <div className="spinner-border" role='status'>
        <span className="visually-hidden">Loading...</span>
      </div>
    </Container>
  )
}

export default Spinner