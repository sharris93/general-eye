import express from 'express'

const router = express.Router()


// Index - get all articles
router.get('/articles', async (req, res) => {
  return res.render('articles/index.ejs')
})

// Create - create a new article

// Show - displays a single article

// Update - allows us to update an existing article

// Delete - allows us to delete an existing article


// ! Don't forget to export your router
export default router