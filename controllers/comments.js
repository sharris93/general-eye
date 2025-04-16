import mongoose from 'mongoose'
import express from 'express'
import Article from '../models/Article.js'
import isSignedIn from '../middleware/isSignedIn.js'

const router = express.Router()

// ! Routes
// Create route
router.post('/articles/:articleId/comments', isSignedIn, async (req, res, next) => {
  try {
    // Check article id in valid format, 404 if not
    if (!mongoose.isValidObjectId(req.params.articleId)){
      return next()
    }
    
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

// Delete route
router.delete('/articles/:articleId/comments/:commentId', isSignedIn, async (req, res, next) => {
  try {
    // Check articleId is valid in format, 404 if not
    if (!mongoose.isValidObjectId(req.params.articleId)){
      return next()
    }

    // Find the parent document first
    const article = await Article.findById(req.params.articleId)
    if (!article) return next()

    // Check if the commentId is a valid format, return 404 if not (as no comment will be found) 
    if (!mongoose.isValidObjectId(req.params.commentId)){
      return next()
    }

    // Find the child (subdocument) we want to delete
    const comment = article.comments.id(req.params.commentId)
    
    if(!comment.author.equals(req.session.user._id)) return res.status(403).send('You do not have permission to access this resource')

    // Delete the comment
    comment.deleteOne()

    // Save the parent document to persist this change to the database
    await article.save()

    // Redirect back to the same page
    return res.redirect(`/articles/${article._id}`)

  } catch (error) {
    console.log(error)
  }
})




export default router