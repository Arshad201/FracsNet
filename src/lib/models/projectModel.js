const { default: mongoose } = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
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
  link: {
    type: String,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

export const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);