const { default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema({
  commentText: {
    type: String,
  },
  commentImage: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  commentIn:{
    type: String,
    enum: ["blogPost", "thread"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

export const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);
