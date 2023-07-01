const asyncHandler = require('express-async-handler')
const Books = require('../models/BookModel')
const Users = require('../models/UserModel')

// route: /api/books
// method: GET
// access: private
const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Books.find({ user: req.user.id })

  res.status(200).json(books)
})

// route: /api/books
// method: POST
// access: private
const addNewBook = asyncHandler(async (req, res) => {
  if(!req.body.title || !req.body.price){
    res.status(400)
    throw new Error('Book title and price are required.')
  }

  const newbook = await Books.create({
    user: req.user.id,
    title: req.body.title,
    desc: ( !req.body.desc ? '' : req.body.desc ),
    price: req.body.price,
  })

  res.status(200).json(newbook)
})

// route: /api/books/:id
// method: PUT
// access: private
const updateBookInfo = asyncHandler(async (req, res) => {
  const bookToUpdate = await Books.findById(req.params.id)

  if(!bookToUpdate){
    res.status(400)
    throw new Error('Book not found.')
  }

  if(!req.body.title || !req.body.price){
    res.status(400)
    throw new Error('Book title and price are required.')
  }

  if(!req.user){
    res.status(401)
    throw new Error('User not found')
  }

  if(bookToUpdate.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedBook = await Books.findByIdAndUpdate(req.params.id, req.body, { new: true })

  res.status(200).json(updatedBook)
})

// route: /api/books/:id
// method: DELETE
// access: private
const deleteBook = asyncHandler(async (req, res) => {
  const bookToDelete = await Books.findById(req.params.id)

  if(!bookToDelete){
    res.status(400)
    throw new Error('Book not found.')
  }

  if(!req.user){
    res.status(401)
    throw new Error('User not found')
  }

  if(bookToDelete.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('User not authorized')
  }

  await bookToDelete.deleteOne()

  res.status(200).json({
    id: req.params.id,
    success: true,
    message: `Deleted book with ID: ${req.params.id} via DELETE at http://localhost:6969/delete-book/${req.params.id}`
  })
})

module.exports = {
  getAllBooks,
  addNewBook,
  updateBookInfo,
  deleteBook,
}