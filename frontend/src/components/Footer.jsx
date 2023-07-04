import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Footer() {
  return (
    <Container fluid className="footer bg-dark text-light py-3">
      <Row className='mb-3'>
        <Container className='text-center'>
          <h6>Nathaniel Torres</h6>
          <p>@ 2023</p>
        </Container>
      </Row>
      <hr />
      <Row className='mt-3 mb-3 justify-content-center'>
        <Col xs lg='6'>
          <Container className='text-center'>
            <p>built using:</p>
            <Row className='align-items-center justify-content-center'>
              <Col xs='2'>reactjs logo</Col>
              <Col xs='2'>reduxjs logo</Col>
              <Col xs='2'>expressjs logo</Col>
              <Col xs='2'>nodejs logo</Col>
              <Col xs='2'>mongodb logo</Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row className='mt-3 mb-3 justify-content-center'>
        <Col xs lg='6'>
          <Container className='d-flex gap-2 justify-content-center'>
            <p>hosted at:</p>
            <i className='bi bi-github'></i>
            <i>Vercel logo</i>
          </Container>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer