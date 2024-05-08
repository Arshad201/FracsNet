const { default: mongoose } = require("mongoose");

const threadSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  media:{
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
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
  },
});

export const Thread = mongoose.models.Thread || mongoose.model('Thread', threadSchema);
