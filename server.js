import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import 'dotenv/config'

// Routers
import articlesRouter from './controllers/articles.js'

// ! Variables
const app = express()
const port = process.env.PORT || 3000


// ! Middleware
app.use(morgan('dev'))

// ! Routes
// ? Defined in server.js
// Home page
app.get('/', (req, res) => {
  return res.render('index.ejs')
})

// ? Defined in dedicated controller files
// Articles (create, index, show, update, delete)
app.use('/', articlesRouter)

// Users (register/login/profile)


// ! Listen
async function startServers(){
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log(`🔒 Database connection established`)

    // Connect the Express Server
    app.listen(port, () => console.log(`🚀 Server up and running on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}
startServers()