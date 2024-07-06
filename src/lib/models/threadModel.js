const { default: mongoose } = require("mongoose");

const threadSchema = new mongoose.Schema({
  threadText: {
    type: String,
  },
  threadImage: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      }
    }
  ],
  threadVideo: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      }
    }
  ],
  youTubeVideo: {
    type: String
  },
  files: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      }
    }
  ],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  shares: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  postedIn:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

export const Thread = mongoose.models.Thread || mongoose.model('Thread', threadSchema);
