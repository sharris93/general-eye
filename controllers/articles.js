import express from 'express'
import Article from '../models/Article.js'

const router = express.Router()

// ! Routes that render a web page
// Index - get all articles
router.get('/articles', async (req, res) => {
  const allArticles = await Article.find()
  return res.render('articles/index.ejs', {
    articles: allArticles
  })
})

// New - Displays the form that allows us to submit a CREATE request
router.get('/articles/new', (req, res) => {
  return res.render('articles/new.ejs')
})

// Edit - Displays the form that allows us to submit an UPDATE request
router.get('/articles/:articleId/edit', async (req, res) => {
  const article = await Article.findById(req.params.articleId)
  console.log(article)
  return res.render('articles/edit.ejs', {
    article
  })
})

// Show - displays a single article
router.get('/articles/:articleId', async (req, res) => {
  const article = await Article.findById(req.params.articleId)
  return res.render('articles/show.ejs', {
    article: article
  })
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
router.put('/articles/:articleId', async (req, res) => {
  try {
    const articleId = req.params.articleId
    await Article.findByIdAndUpdate(articleId, req.body)
    return res.redirect(`/articles/${articleId}`)
  } catch (error) {
    console.log(error)
  }
})

// Delete - allows us to delete an existing article
router.delete('/articles/:articleId', async (req, res) => {
  await Article.findByIdAndDelete(req.params.articleId)
  return res.redirect('/articles')
})

// ! Don't forget to export your router
export default router