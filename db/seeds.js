import mongoose from 'mongoose'
import 'dotenv/config' // Load env variables onto process.env

// Models
import User from '../models/User.js'
import Article from '../models/Article.js'

// Seed data
import articleData from './data/articles.js'
import userData from './data/users.js'

async function seedData(){
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('🔒 DB connection established')

    // 2. Remove existing data from the database collections
    const deletedUsers = await User.deleteMany()
    console.log(`❌ ${deletedUsers.deletedCount} users deleted from the db`)
    
    const deletedArticles = await Article.deleteMany()
    console.log(`❌ ${deletedArticles.deletedCount} articles deleted from the db`)

    // 3. Creating new users
    const users = await User.create(userData)
    console.log(`👨 ${users.length} users added to the db`)
    
    // 4. Use the new user's _id fields to add an author to the articles and comments
    const articlesWithAuthors = articleData.map((article) => {
      article.author = users[Math.floor(Math.random() * users.length)]._id
      article.comments = article.comments.map((comment) => {
        comment.author = users[Math.floor(Math.random() * users.length)]._id
        return comment
      })
      return article
    })
    
    // 5. Create the articles with comments
    const articles = await Article.create(articlesWithAuthors)
    console.log(`📖 ${articles.length} articles added to the db`)

    // 6. Closing connection to MongoDB
    await mongoose.connection.close()
  } catch (error) {
    console.log(error)
    // Closing connection to MongoDB
    await mongoose.connection.close()
  }
}

seedData()