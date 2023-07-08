import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBook, editBook, displayBooks } from '../features/books/BookSlice'
import Container from 'react-bootstrap/Container'

function BookForm({isShowed, type, bookId, title, price, desc, ...rest}) {
  const [bookData, setBookData] = useState({
    title: title,
    desc: desc,
    price: price,
  })

  const dispatch = useDispatch()

  const onSubmit = e => {
    e.preventDefault()

    const toEdit = {
      bookId,
      bookData,
    }

    if(type && type === 'edit'){
      dispatch(editBook(toEdit))
      dispatch(displayBooks())
    } else {
      dispatch(addBook(bookData))
    }

    isShowed(false)
  }

  const onChange = (e) => {
    setBookData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Container>
      <form onSubmit={onSubmit}>

        {type && type === 'edit' ? (
          <h3 className="mb-3">Edit Book</h3>
        ) : (
          <h3>Add new Book</h3>
        )}
        <p className="mb-4">Fill in the fields below.</p>

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
    </Container>
  )
}

export default BookForm