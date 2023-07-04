import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BookForm from '../components/BookForm'
import BookItem from '../components/BookItem'
import Spinner from '../components/Spinner'
import { displayBooks, reset } from '../features/books/BookSlice'
import { toast } from 'react-toastify'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { user } = useSelector((state) => state.auth)
  const { books, isLoading, isError, message } = useSelector((state) => state.books)

  const [modalShow, setModalShow] = useState(false)

  useEffect(() => {
    if(!user){
      navigate('/login')
    }

    dispatch(displayBooks())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, dispatch])
  // ^
  // |
  // isError, message
  // if included above along with the "user, navigate, dispatch", a runtime error is produced
  // as an alternative, used them inside a separate useEffect
  useEffect(() => {
    if(user && isError){
      toast.error(message)
    }
  }, [user, isError, message])

  if(isLoading){
    return <Spinner />
  }

  const MyVerticallyCenteredModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <BookForm isShowed={setModalShow}/>
        </Modal.Body>
      </Modal>
    )
  }

  return (
    <Container className='h-100'>
      <Container className='d-flex gap-2 mb-2'>
        <h4 className='text-light'><i className='bi bi-kanban'></i>&nbsp;&nbsp;Your Boook Collection</h4>
      </Container>
      <Container className='d-flex justify-content-center justify-content-md-start mb-3'>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          <h6 className='mb-0'><i className='bi bi-plus'></i><span>Add New Book</span></h6>
        </Button>
      </Container>
      <Container className='mb-4'>
        { books.length > 0 ? (
          <Row>
            {books.map((book) => (
              <BookItem key={book._id} book={book}/>
            ))}
          </Row>
        ) : (
          <Row className='bg-light text-center py-5 rounded-3'>
            <i className='login-logo bi bi-info-circle'></i>
            <h6>You have no books in your library.</h6>
          </Row>
        )}
      </Container>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </Container>
  )
}

export default Dashboard