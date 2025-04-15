import mongoose, { Schema } from 'mongoose'

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 150 },
  content: { type: String, required: true },
  tags: [String],
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})


const Article = mongoose.model('Article', articleSchema)

export default Article