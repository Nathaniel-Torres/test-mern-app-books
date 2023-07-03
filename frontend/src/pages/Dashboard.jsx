import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BookForm from '../components/BookForm'
import BookItem from '../components/BookItem'
import Spinner from '../components/Spinner'
import { displayBooks, reset } from '../features/books/BookSlice'
import { toast } from 'react-toastify'
import Row from 'react-bootstrap/Row'

function Dashboard() {
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

  return (
    <Row className='h-100'>
      <div className="container my-3 text-center">
        <h1>Welcome {user && user.name }</h1>
      </div>

      <div className="container mb-4">
        <h1 className='lead fw-bold'>Your Book Collection</h1>
      </div>

      <div className="container mb-4">
        { books.length > 0 ? (
          <div className="row">
            {books.map((book) => (
              <BookItem key={book._id} book={book}/>
            ))}
          </div>
        ) : (<h3>You have no books in library.</h3>)}
      </div>

      <BookForm />
    </Row>
  )
}

export default Dashboard