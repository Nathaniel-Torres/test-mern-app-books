
import { useDispatch } from 'react-redux'
import { deleteBook, displayBooks } from '../features/books/BookSlice'


function BookItem({book}) {
  const dispatch = useDispatch()

  const onDelete = () => {
    dispatch(deleteBook(book._id))
    dispatch(displayBooks())
  }

  return (
    <div className="col-6 col-md-4">
      <div className="container bg-secondary-subtle rounded-3 py-2">
      <h4>Title: {book.title}</h4>
      <h5 className="text-danger fw-bold">Price: {book.price}</h5>

      <div className="row">
        <div className="container">
          <p>Description: {book.desc ? book.desc : 'None'}</p>
        </div>
      </div>

      <p className="mb-0"><i>Created at: {new Date(book.createdAt).toLocaleString('en-US')}</i></p>
      <p><i>Last update: {new Date(book.updatedAt).toLocaleString('en-US')}</i></p>

      <div className="row">
        <div className="container d-flex gap-2">
          <button type='button' className="btn btn-secondary">Edit</button>
          <button type='button' onClick={onDelete}className="btn btn-danger" name={book._id}>Delete</button>
        </div>
      </div>
      
    </div>
    </div>
  )
}

export default BookItem