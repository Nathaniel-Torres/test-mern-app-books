import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'
import BookForm from './BookForm'
import { useDispatch } from 'react-redux'
import { deleteBook, displayBooks } from '../features/books/BookSlice'


function BookItem({book}) {
  const dispatch = useDispatch()

  const [modalShow, setModalShow] = useState(false)
  const [bookId, setBookId] = useState('')

  const MyVerticallyCenteredModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <BookForm
            isShowed={setModalShow}
            bookId={bookId}
            type='edit'
            title={book.title}
            desc={book.desc}
            price={book.price}
          />
        </Modal.Body>
      </Modal>
    )
  }

  const onEdit = (e) => {
    setModalShow(true)
    setBookId(e.target.name)
  }

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
            <Button type='button' onClick={onEdit} name={book._id} variant='secondary' className='text-light'>
              <i className='bi bi-pencil'></i>
            </Button>
            <Button type='button' onClick={onDelete} className="btn btn-danger" name={book._id}>
              <i className='bi bi-trash-fill'></i>
            </Button>
          </Container>
        </Row>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Container>
    </Col>
  )
}

export default BookItem