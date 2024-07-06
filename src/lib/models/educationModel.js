const { default: mongoose } = require("mongoose");

const educationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  schools: [
    {
      standard: {
        type: String,
      },
      schoolName: {
        type: String
      },
      schoolAddress:{
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
  CollegeOrUniversity: [
    {
      program: {
        type: String
      },
      instituteName: {
        type: String
      },
      address: {
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


export const Education = mongoose.models.Education || mongoose.model("Education", educationSchema);