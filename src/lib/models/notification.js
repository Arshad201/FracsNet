const { default: mongoose } = require("mongoose");

const tagSchema = new mongoose.Schema({
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notificationType: {
    type: String,
    enum: ["like", "comment", "reply", "send-request", "accept-request", "general"]
  },
  recipient: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'recipientModel'
  },
  recipientModel: {
    type: String,
    enum: ["Thread", "Poll", "Job", "Blogpost", "User"],
    required: true,
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

export const Notification = mongoose.models.Notification || mongoose.model('Notification', tagSchema);
