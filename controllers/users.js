import express from 'express'
import User from '../models/User.js'

const router = express.Router()

router.get('/profile', async (req, res, next) => {
  try {
    console.log(req.session.user)
    return res.render('users/profile.ejs')
  } catch (error) {
    console.log(error)
  }
})


export default router