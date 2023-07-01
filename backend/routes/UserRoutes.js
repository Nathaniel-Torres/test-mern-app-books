const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/AuthMiddleware')
const {
  registerUser,
  loginUser,
  currentUser,
} = require('../controllers/UserController')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/m', protect, currentUser)

module.exports = router