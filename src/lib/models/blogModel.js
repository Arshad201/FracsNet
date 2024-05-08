const { default: mongoose } = require("mongoose");

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  blogImage:{
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category:{
    type: String,
    default: "General"
  },
  tags: [{
    type: String
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Like'
  }],
  shares: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Share'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema);
