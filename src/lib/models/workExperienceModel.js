const { default: mongoose } = require("mongoose");

const workExperienceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  workExperience: [
    {
      designation: {
        type: String
      },
      companyName: {
        type: String
      },
      description: {
        type: String
      },
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
});


export const workExperience = mongoose.models.workExperience || mongoose.model("workExperience", workExperienceSchema);