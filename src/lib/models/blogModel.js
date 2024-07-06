const { default: mongoose } = require("mongoose");

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  featuredImage: {
    public_id: {
      type: String,
      default: "samplePublic_Id_1",
    },
    url: {
      type: String,
      default: "/heroImg.jpg"
    }
  },
  images: [
    {
      public_id: {
        type: String,
        default: "samplePublic_Id_1",
      },
      url: {
        type: String,
        default: "/heroImg.jpg"
      }
    }
  ],
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
    required: true,
    maxLength: 160
  },
  metaDescription: {
    type: String,
    required: true,
    maxLength: 160
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    default: "General"
  },
  tags: [{
    type: String,
    trim: true
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
