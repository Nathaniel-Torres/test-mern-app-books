import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBook } from '../features/books/BookSlice'

function BookForm() {
  const [bookData, setBookData] = useState({
    title: '',
    desc: '',
    price: '',
  })

  const dispatch = useDispatch()

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

  return (
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
}

export default BookForm