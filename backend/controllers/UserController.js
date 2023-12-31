const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Users = require('../models/UserModel')

// route: /api/users
// method: POST
// access: public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if(!name || !email || !password){
    res.status(400)
    throw new Error('Please fill in all the required fields.')
  }

  const userExists = await Users.findOne({ email })

  if(userExists){
    res.status(400)
    throw new Error('User is already registered.')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const newUser = await Users.create({
    name,
    email,
    password: hashedPassword,
  })

  if(newUser){
    res.status(201).json({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user credentials.')
  }
})

// route: /api/users/login
// method: POST
// access: public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if(!email || !password){
    res.status(400)
    throw new Error('Please fill in all fields to login.')
  }

  const user = await Users.findOne({ email })

  if(user && (await bcrypt.compare(password, user.password))){
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user credentials.')
  }
})

// route: /api/users/m
// method: GET
// access: private
const currentUser = asyncHandler(async (req, res) => {
  const { _id, name, email } = await Users.findById(req.user.id)

  res.status(200).json(req.user)
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

module.exports = {
  registerUser,
  loginUser,
  currentUser,
}