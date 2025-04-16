import mongoose, { Schema } from 'mongoose'

// Comment Schema (child document)
const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

// Article Schema (parent document)
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 150 },
  content: { type: String, required: true },
  tags: [String],
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [commentSchema]
}, {
  timestamps: true
})


const Article = mongoose.model('Article', articleSchema)

export default Article