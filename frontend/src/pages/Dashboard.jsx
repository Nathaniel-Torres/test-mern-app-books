import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
//import BookForm from '../components/BookForm'
import BookItem from '../components/BookItem'
import Spinner from '../components/Spinner'
import { displayBooks, reset } from '../features/books/BookSlice'
import { toast } from 'react-toastify'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Button from 'react-bootstrap/Button'

function Dashboard() {
  const reactSwal = withReactContent(Swal)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { user } = useSelector((state) => state.auth)
  const { books, isLoading, isError, message } = useSelector((state) => state.books)

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

  const SwalFire = () => {
    reactSwal.fire({
      html: (
        BookForm
      )
    })
  }

  // try

  const [bookData, setBookData] = useState({
    title: '',
    desc: '',
    price: '',
  })

  const onSubmit = e => {
    e.preventDefault()

    dispatch(addBook(bookData))
  }

  const onChange = (e) => {
    setBookData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const BookForm = (
    <div className='container bg-secondary rounded py-3'>
      <form onSubmit={onSubmit}>

        <h3 className="text-light mb-3">Add New Book</h3>
        <p className="text-light mb-4">Fill in the fields to add a book.</p>

        <div className="form-group mb-2">
          <input
            className='form-control'
            type="text"
            name="title"
            id="title"
            placeholder='Book title'
            onChange={onChange} 
            value={bookData.title}
          />
        </div>

        <div className="form-group mb-2">
          <input
            className='form-control'
            type="text"
            name="desc"
            id="desc"
            placeholder='Book Description'
            onChange={onChange} 
            value={bookData.desc}
          />
        </div>

        <div className="form-group mb-2">
          <input
            className='form-control'
            type="number"
            name="price"
            id="price"
            placeholder='Book Price'
            onChange={onChange} 
            value={bookData.price}
          />
        </div>

        <div className="form-group">
          <button type='submit' className='btn btn-dark'>Submit</button>
        </div>

      </form>
    </div>
  )

  // try

  return (
    <Container className='h-100'>
      <Container className='d-flex gap-2 mb-2'>
        <h4 className='text-light'><i className='bi bi-kanban'></i>&nbsp;&nbsp;Your Boook Collection</h4>
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
      <Container className='my-3'>
        <Button type='button' onClick={SwalFire} variant='secondary' className='text-light'>Test</Button>
      </Container>
      <BookForm />
    </Container>
  )
}

export default Dashboard