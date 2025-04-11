import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import 'dotenv/config'
import methodOverride from 'method-override'

// Routers
import articlesRouter from './controllers/articles.js'

// ! Variables
const app = express()
const port = process.env.PORT || 3000


// ! Middleware
app.use(methodOverride('_method'))
app.use(express.urlencoded()) // Similar to express.json(), this middleware instead captures urlencoded body types (forms) on requests and transforms the data onto the req.body key
app.use(morgan('dev'))
app.use(express.static('public'))

// ! Routes
// Home page
app.get('/', (req, res) => {
  return res.render('index.ejs')
})

// Articles (create, index, show, update, delete)
app.use('/', articlesRouter)

// Users (register/login/profile)


// ! 404 Route
// This route will catch any GET requests that have not matched any route previously
app.get('/{*any}', (req, res) => {
  return res.status(404).render('404.ejs')
})


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