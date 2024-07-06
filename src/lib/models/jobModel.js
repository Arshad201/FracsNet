const { default: mongoose } = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  requirements: [
    {
      type: String,
      trim: true
    }
  ],
  benefits: [
    {
      type: String,
      trim: true
    }
  ],
  preferredQualifications: [
    {
      type: String,
      trim: true
    }
  ],
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      }
    }
  ],
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
  skills: [{
    type: String,
    trim: true
  }],
  jobAgreement: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'temporary', 'internship'],
    required: true,
  },
  isRemote: {
    type: String,
    enum: ['remote', 'hybrid', 'onsite'],
    required: true,
  },
  payoutStructure: {
    type: String,
    enum: ["hourly", "daily", "weekly", "bi-weekly", "semi-monthly", "monthly", "quarterly", "yearly"],
    required: true
  },
  payout: {
    type: Number,
    required: true
  },
  payoutCurrency: {
    name:{
      type: String
    },
    isoCode:{
      type: String
    },
  },
  company: {
    type: String,
    trim: true
  },
  companyWebsite: {
    type: String,
    trim: true
  },
  city: {
    city: {
      type: String
    },
    countryCode: {
      type: String
    },
    stateCode: {
      type: String
    },
  },
  state: {
    state: {
      type: String
    },
    countryCode: {
      type: String
    },
    stateCode: {
      type: String
    },
  },
  country: {
    country: {
      type: String
    },
    countryCode: {
      type: String
    },
    flag: {
      type: String
    },
  }
  ,
  applyByDate: {
    type: Date, //Deadline to Apply for the Job
  },
  applicants: [{
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
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  postedIn:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    default: null
  },
  postedAt: {
    type: Date,
    default: Date.now
  },
});

export const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);
