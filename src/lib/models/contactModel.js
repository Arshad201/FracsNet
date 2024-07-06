const { default: mongoose } = require("mongoose");

const contactSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  phoneNumber: {
    countryCode: {
      type: String
    },
    number: {
      type: String
    }
  },
  email: {
    type: String
  },
  city: {
    stateCode: {
      type: String,
    },
    countryCode: {
      type: String,
    },
    city: {
      type: String
    }
  },
  state: {
    countryCode: {
      type: String,
    },
    stateCode: {
      type: String,
    },
    state: {
      type: String,
    },
  },
  country: {
    country: {
      type: String,
    },
    countryCode: {
      type: String,
    },
    flag: {
      type: String
    }
  },
  socialLinks: [
    {
      type: String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
});

export const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);