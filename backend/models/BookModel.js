const mongoose = require('mongoose')

const bookSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Books',
    },
    title: {
      type: String,
      required: [true, 'Please add a book title.']
    },
    desc: {
      type: String,
      required: false
    },
    price: {
      type: Number,
      required: [true, 'Please specify book price.']
    }
  },
  {
    timestamps: true
  },
)

module.exports = mongoose.model('Books', bookSchema)