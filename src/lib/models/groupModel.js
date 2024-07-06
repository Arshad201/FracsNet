const { default: mongoose } = require("mongoose");

const groupSchema = new mongoose.Schema({
  groupTitle: {
    type: String,
    required: true
  },
  groupDescription: {
    type: String,
    required: true
  },
  profilePic: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    }
  },
  bgPic: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    }
  },
  groupAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
});

export const Group = mongoose.models.Group || mongoose.model('Group', groupSchema);
