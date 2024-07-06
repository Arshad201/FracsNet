const { default: mongoose } = require("mongoose");

const replySchema = new mongoose.Schema({
  replyText: {
    type: String,
  },
  replyImage: {
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
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
});

export const Reply = mongoose.models.Reply || mongoose.model('Reply', replySchema);
