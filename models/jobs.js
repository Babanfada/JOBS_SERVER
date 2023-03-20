const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "company filed is required"],
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    status: {
      type: String,
      required: [true, "status filed is required"],
      enum: {
        values: ["interview", "pending", "decline"],
        message: `{VALUE} is not supported`,
      },
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "USERAUTH",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JOBS", jobsSchema);
