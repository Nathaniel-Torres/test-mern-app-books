import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useDispatch } from 'react-redux'
import { deleteBook, displayBooks } from '../features/books/BookSlice'


function BookItem({book}) {
  const dispatch = useDispatch()

  const onDelete = () => {
    dispatch(deleteBook(book._id))
    dispatch(displayBooks())
  }

  return (
    <Col xs='12' sm='6' md='4' className='mb-3'>
      <Container className='bg-light py-3 rounded-3'>
        <h5 className='lead fw-bold'>{book.title}</h5>
        <h6 className="text-danger fw-bold">PHP {book.price}</h6>
        <hr />
        <p>Description: {book.desc ? book.desc : 'None'}</p>
        <p className="mb-0"><i>Created at: {new Date(book.createdAt).toLocaleString('en-US')}</i></p>
        <p><i>Last update: {new Date(book.updatedAt).toLocaleString('en-US')}</i></p>
        <hr />
        <Row>
          <Container className='d-flex justify-content-end gap-2'>
            <Button type='button' variant='secondary' className='text-light'>
              <i className='bi bi-pencil'></i>
            </Button>
            <Button type='button' onClick={onDelete} className="btn btn-danger" name={book._id}>
              <i className='bi bi-trash-fill'></i>
            </Button>
          </Container>
        </Row>
      </Container>
    </Col>
  )
}

export default BookItem