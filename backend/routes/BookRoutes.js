const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/AuthMiddleware')
const {
  getAllBooks,
  addNewBook,
  updateBookInfo,
  deleteBook,
} = require('../controllers/BookController')

router.route('/').get(protect, getAllBooks).post(protect, addNewBook)
router.route('/:id').put(protect, updateBookInfo).delete(protect, deleteBook)

module.exports = router