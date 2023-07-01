const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please set your name.']
    },
    email: {
      type: String,
      required: [true, 'Please set your email.'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Please set your password.']
    }
  },
  {
    timestamps: true
  },
)

module.exports = mongoose.model('Users', userSchema)