import express from 'express'
import User from '../models/User.js'
import Article from '../models/Article.js'

const router = express.Router()

router.get('/profile', async (req, res, next) => {
  try {
    // Get all authored articles
    const authoredArticles = await Article.find({ author: req.session.user._id })

    // Get all liked articles
    const likedArticles = await Article.find({ likes: req.session.user._id })

    // Render
    return res.render('users/profile.ejs', {
      authoredArticles,
      likedArticles
    })
  } catch (error) {
    console.log(error)
  }
})


export default router