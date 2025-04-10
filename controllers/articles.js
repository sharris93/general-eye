import express from 'express'
import Article from '../models/Article.js'

const router = express.Router()

// ! Routes that render a web page
// Index - get all articles
router.get('/articles', async (req, res) => {
  return res.render('articles/index.ejs')
})

// New - Displays the form that allows us to submit a CREATE request
router.get('/articles/new', (req, res) => {
  return res.render('articles/new.ejs')
})

// Edit - Displays the form that allows us to submit an UPDATE request
router.get('/articles/:articleId/edit', async (req, res) => {
  return res.render('articles/edit.ejs')
})

// Show - displays a single article
router.get('/articles/:articleId', async (req, res) => {
  return res.render('articles/show.ejs')
})




// ! Routes that DO NOT render a web page
// Create - create a new article
router.post('/articles', async (req, res) => {
  try {
    const newArticle = await Article.create(req.body)
    return res.redirect(`/articles/${newArticle._id}`)
  } catch (error) {
    console.log(error)
  }
})

// Update - allows us to update an existing article

// Delete - allows us to delete an existing article


// ! Don't forget to export your router
export default router