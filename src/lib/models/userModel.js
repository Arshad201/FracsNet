const { default: mongoose } = require("mongoose");


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  userName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    unique: true
  },
  profilePic: {
    public_id: {
      type: String,
      default: "sample_id",
      required: true,
    },
    url: {
      type: String,
      default: "sample_url",
      required: true,
    },
  },
  bgImage: {
    public_id: {
      type: String,
      default: "sample_id",
      required: true,
    },
    url: {
      type: String,
      default: "sample_url",
      required: true,
    },
  },
  password: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false
  },
  bio: {
    type: String,
  },
  role: {
    type: String,
  },
  profileType: {
    type: String,
    enum: ['Admin', 'User', 'Moderator'],
    default: 'User'
  },
  network: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  education: {
    school: [
      {
        name: {
          type: String,
          required: true
        },
        standard: {
          type: String,
          required: true
        },
        description: {
          type: String,
        },
        startDate: {
          type: Date,
          required: true
        },
        endDate: {
          type: Date,
          required: true
        }
      }
    ],
    university: [
      {
        name: {
          type: String,
          required: true
        },
        degree: {
          type: String,
          required: true
        },
        description: {
          type: String,
        },
        startDate: {
          type: Date,
          required: true
        },
        endDate: {
          type: Date,
          required: true
        }
      }
    ]
  },
  work: [
    {
      designation: {
        type: String,
        required: true
      },
      companyName: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      startDate: {
        type: Date,
        required: true
      },
      endDate: {
        type: Date,
        required: true
      }
    }
  ],
  recentActivity: {
    thread: [
      {
        activityName: {
          type: String,
        },
        activityId: {
          type: String,
        },
      }
    ],
    threadLike: [
      {
        activityName: {
          type: String,
        },
        activityId: {
          type: String,
        },
      }
    ],
    threadComment: [
      {
        activityName: {
          type: String,
        },
        activityId: {
          type: String,
        },
      }
    ],
    threadCommentLike: [
      {
        activityName: {
          type: String,
        },
        activityId: {
          type: String,
        },
      }
    ],
    threadReply: [
      {
        activityName: {
          type: String,
        },
        activityId: {
          type: String,
        },
      }
    ],
    threadReplyLike: [
      {
        activityName: {
          type: String,
        },
        activityId: {
          type: String,
        },
      }
    ],
    blogPost: [
      {
        activityName: {
          type: String,
        },
        activityId: {
          type: String,
        },
      }
    ],
    blogPostLike: [
      {
        activityName: {
          type: String,
        },
        activityId: {
          type: String,
        },
      }
    ],
    blogPostComment: [
      {
        activityName: {
          type: String,
        },
        activityId: {
          type: String,
        },
      }
    ],
    blogPostCommentLike: [
      {
        activityName: {
          type: String,
        },
        activityId: {
          type: String,
        },
      }
    ],
    blogPostReply: [
      {
        activityName: {
          type: String,
        },
        activityId: {
          type: String,
        },
      }
    ],
    blogPostReplyLike: [
      {
        activityName: {
          type: String,
        },
        activityId: {
          type: String,
        },
      }
    ],
    search: [
      {
        activityName: {
          type: String,
        },
        activityId: {
          type: String,
        },
      }
    ],
    connectionRequest: [
      {
        activityName: {
          type: String,
        },
        activityId: {
          type: String,
        },
      }
    ]
  },
  socialLinks: [
    {
      name: {
        type: String
      },
      url: {
        type: String
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
});


export const User = mongoose.models.User || mongoose.model("User", userSchema);