import serverless from 'serverless-http'
import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import 'dotenv/config'
import methodOverride from 'method-override'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passUserToView from '../../middleware/passUserToView.js'
import passErrorToView from '../../middleware/passErrorToView.js'

// Routers
import articlesRouter from '../../controllers/articles.js'
import authRouter from '../../controllers/auth.js'
import userRouter from '../../controllers/users.js'
import commentRouter from '../../controllers/comments.js'

// ! Variables
const app = express()

// ! Middleware
app.use(methodOverride('_method'))
// app.use(express.urlencoded()) // Similar to express.json(), this middleware instead captures urlencoded body types (forms) on requests and transforms the data onto the req.body key
app.use(morgan('dev'))
app.use(express.static('public')) // This line serves static files to the client (CSS/JS/Images etc)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  })
}))

// This is our own custom middleware
// It's going to take the user from the req.session key
// and make it available to every route that follows this middleware
app.use(passUserToView)
app.use(passErrorToView)

// ! Routes
// Home page
app.get('/', (req, res) => {
  return res.render('index.ejs')
})

// Articles (create, index, show, update, delete)
app.use('/', express.urlencoded(), articlesRouter)

// Comments (create, update, delete)
app.use('/', express.urlencoded(), commentRouter)

// Users (register/login/profile)
app.use('/', express.urlencoded(), authRouter)
app.use('/', express.urlencoded(), userRouter)


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
  } catch (error) {
    console.log(error)
  }
}
startServers()

export const handler = serverless(app)