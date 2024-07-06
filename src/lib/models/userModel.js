import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  userName: {
    type: String,
    unique: true ,
  },
  email: {
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
  promotionalVideo: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    }
  },
  featured: {
    type: Boolean,
    default: false
  },
  bio: {
    type: String,
  },
  designation: {
    type: String
  },
  accountType: {
    type: String,
    default: "Gold",
    enum: ["Silver", "Gold", "Platinum", "Diamond", "Admin"]
  },
  network: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  joinedGroups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  }],
  sendRequest:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  pendingRequest: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});



userSchema.pre('save', function(next) {
  if (!this.userName) {
    this.userName = "username_"+this._id.toString();
  }
  next();
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);