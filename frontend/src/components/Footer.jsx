import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Footer() {
  return (
    <Container fluid className="footer bg-dark text-light py-3">
      <Row className='mb-5'>
        <Container className='text-center'>
          <h6>Nathaniel Torres</h6>
          <p>@ 2023</p>
          <p><i className='bi bi-envelope'></i>&nbsp;:&nbsp;it.nathaniel.m.torres@gmail.com</p>
          <a href='https://nathaniel-torres.github.io/' className='text-light'>
            <i className='bi bi-globe-americas'></i>&nbsp;:&nbsp;
            {('https://nathaniel-torres.github.io/').toString()}
          </a>
        </Container>
      </Row>
      <hr />
      <Row className='mt-3 mb-3 justify-content-center'>
        <Col xs lg='6'>
          <Container className='text-center'>
            <p>built using:</p>
            <Row className='align-items-center justify-content-center'>
              <Col xs='2'>
                <a href='https://react.dev/' className='text-light'>
                  React<i className='bi bi-box-arrow-in-up-right'></i>
                </a>
              </Col>
              <Col xs='2'>
                <a href='https://redux.js.org/' className='text-light'>
                  Redux<i className='bi bi-box-arrow-in-up-right'></i>
                </a>
              </Col>
              <Col xs='2'>
                <a href='https://expressjs.com/' className='text-light'>
                  Express<i className='bi bi-box-arrow-in-up-right'></i>
                </a>
              </Col>
              <Col xs='2'>
                <a href='https://nodejs.org/en' className='text-light'>
                  Node<i className='bi bi-box-arrow-in-up-right'></i>
                </a>
              </Col>
              <Col xs='2'>
                <a href='https://www.mongodb.com/' className='text-light'>
                  MongoDB<i className='bi bi-box-arrow-in-up-right'></i>
                </a>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row className='mt-3 mb-3 justify-content-center'>
        <Col xs lg='6'>
          <Container className='d-flex gap-2 justify-content-center'>
            <p>GitHub project repository:</p>
            <a href='https://github.com/Nathaniel-Torres/test-mern-app-books' className='text-light'>
              <i className='bi bi-github'></i>&nbsp;&nbsp;here
            </a>
          </Container>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer