import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'

const router = express.Router()

// ! Routes
// Sign up form page
router.get('/sign-up', (req, res) => {
  try {
    return res.render('auth/sign-up.ejs', {
      errorMessage: ''
    })
  } catch (error) {
    console.log(error)
  }
})

// Sign in form page


// ? Create a user
// POST /auth/sign-up
router.post('/auth/sign-up', async (req, res) => {
  try {
    // Check passwords match, if not send error response
    if (req.body.password !== req.body.passwordConfirmation) {
      return res.status(422).render('auth/sign-up.ejs', {
        errorMessage: 'Your passwords do not match.'
      })
    }

    // Hash the password prior to creation of user
    req.body.password = bcrypt.hashSync(req.body.password, 12)

    // Create a new user
    const newUser = await User.create(req.body)

    return res.redirect('/auth/sign-in')
  } catch (error) {
    console.log(error.message)

    // Check for a duplicate key error
    if (error.code === 11000) {
      const fieldName = Object.keys(error.keyValue)[0]
      // Re-render the sign up form with errors if they occur
      return res.status(422).render('auth/sign-up.ejs', {
        errorMessage: `That ${fieldName} already exists`
      })
    }

    return res.status(400).render('auth/sign-up.ejs', {
      errorMessage: error.message
    })
  }
})


export default router