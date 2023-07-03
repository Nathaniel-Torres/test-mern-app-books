const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const port = process.env.PORT || 8182
const customBookRoutes = require('./routes/BookRoutes')
const customUserRoutes = require('./routes/UserRoutes')
const { errorHandler } = require('./middleware/ErrorMiddleware')
const connectDB = require('./config/Database')
const cors = require('cors')

connectDB()

const app = express()

// app.use(cors())
app.use(cors({
  origin: 'https://test-mern-app-books.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/books', customBookRoutes)
app.use('/api/users', customUserRoutes)

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
}

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})