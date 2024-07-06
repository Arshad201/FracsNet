const { default: mongoose } = require("mongoose");

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  option_1: {
    optionText: {
      type: String,
      required: true
    },
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    percentage: {
      type: Number,
      default: 0
    }
  },
  option_2: {
    optionText: {
      type: String,
      required: true
    },
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    percentage: {
      type: Number,
      default: 0
    }
  },
  option_3: {
    optionText: {
      type: String,
    },
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    percentage: {
      type: Number,
      default: 0
    }
  },
  option_4: {
    optionText: {
      type: String,
    },
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    percentage: {
      type: Number,
      default: 0
    }
  },
  option_5: {
    optionText: {
      type: String,
    },
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    percentage: {
      type: Number,
      default: 0
    }
  },
  postedBy: {
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

export const Poll = mongoose.models.Poll || mongoose.model('Poll', pollSchema);
