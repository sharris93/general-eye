import mongoose from 'mongoose'
import express from 'express'
import Article from '../models/Article.js'
import isSignedIn from '../middleware/isSignedIn.js'

const router = express.Router()

// ! Routes
// Create route
router.post('/articles/:articleId/comments', isSignedIn, async (req, res, next) => {
  try {
    // Add author to body of request
    req.body.author = req.session.user._id

    // Find article (parent document)
    const article = await Article.findById(req.params.articleId)
    if (!article) return next()
    
    // Push the comment into the comments array
    article.comments.push(req.body)

    // Save the parent to persist the change to the database
    await article.save()

    return res.redirect(`/articles/${article._id}`)
  } catch (error) {
    console.log(error)
    return res.status(400).render('articles/show.ejs', { errorMessage: error.message })
  }
})




export default router