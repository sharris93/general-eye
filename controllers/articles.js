import mongoose from 'mongoose'
import express from 'express'
import Article from '../models/Article.js'
import isSignedIn from '../middleware/isSignedIn.js'

const router = express.Router()

// ! Routes that render a web page
// Index - get all articles
router.get('/articles', async (req, res) => {
  try {
    const allArticles = await Article.find()
    return res.render('articles/index.ejs', {
      articles: allArticles
    })
  } catch (error) {
    console.log(error)
  }
})

// New - Displays the form that allows us to submit a CREATE request
router.get('/articles/new', isSignedIn, (req, res) => {
  try {
    return res.render('articles/new.ejs', {
      errorMessage: ''
    })
  } catch (error) {
    console.log(error)
  }
})

// Edit - Displays the form that allows us to submit an UPDATE request
router.get('/articles/:articleId/edit', isSignedIn, async (req, res, next) => {
  try {
    // Validate incoming articleId
    if (!mongoose.isValidObjectId(req.params.articleId)){
      return next()
    }

    // Search the DB for the article with the provided ID
    const article = await Article.findById(req.params.articleId)

    // If article isn't found, return 404 by running next()
    if (!article) return next()

    // If article was found, render the page
    return res.render('articles/edit.ejs', {
      article,
      errorMessage: ''
    })
  } catch (error) {
    console.log(error)
  }
})

// Show - displays a single article
router.get('/articles/:articleId', async (req, res, next) => {
  try {
    // Before we use the article to find the article
    // Lets check the id is valid
    // If it is NOT valid, we'll send an error response
    if (!mongoose.isValidObjectId(req.params.articleId)){
      return next()
    }

    // Using the id to find an article
    const article = await Article.findById(req.params.articleId)

    // If findById fails to find a matching article to the id provided, it will return null
    // If it returns null, we want to send a 404, by running next()
    if (!article) return next()

    return res.render('articles/show.ejs', {
      article: article
    })
  } catch (error) {
    console.log(error)
  }
})


// ! Routes that DO NOT render a web page
// Create - create a new article
router.post('/articles', async (req, res) => {
  try {
    const newArticle = await Article.create(req.body)
    return res.redirect(`/articles/${newArticle._id}`)
  } catch (error) {
    console.log(error.message)
    return res.render('articles/new.ejs', {
      errorMessage: error.message
    })
  }
})

// Update - allows us to update an existing article
router.put('/articles/:articleId', async (req, res) => {
  try {
    const articleId = req.params.articleId

    // Validate incoming articleId
    if (!mongoose.isValidObjectId(articleId)){
      return next()
    }

    // Attempt to make the update for the article
    const updatedArticle = await Article.findByIdAndUpdate(articleId, req.body)

    // If article not found, return 404
    if (!updatedArticle) return next()


    return res.redirect(`/articles/${articleId}`)
  } catch (error) {
    console.log(error.message)
    return res.render('articles/new.ejs', {
      errorMessage: error.message
    })
  }
})

// Delete - allows us to delete an existing article
router.delete('/articles/:articleId', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.articleId)){
      return next()
    }
    await Article.findByIdAndDelete(req.params.articleId)
    return res.redirect('/articles')
  } catch (error) {
    console.log(error)
  }
})

// ! Don't forget to export your router
export default router