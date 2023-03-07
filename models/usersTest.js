const mongoose = require("mongoose");

const usersTestSchema = new mongoose.Schema({
  orgName: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  lastActiveDate: { type: String, required: true },
  profile: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    avatar: { type: String, required: true },
    gender: {
      type: String,
      enum: { values: ["Male", "Female"], message: `{VALUE} is not supported` },
      required: true,
    },
    bvn: { type: String, required: true },
    address: { type: String, required: true },
    currency: { type: String, required: true },
  },
  guarantor: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    gender: {
      type: String,
      enum: { values: ["Male", "Female"], message: `{VALUE} is not supported` },
      required: true,
    },
    address: { type: String, required: true },
  },
  accountBalance: { type: String, required: true },
  accountNumber: { type: String, required: true },
  socials: {
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String },
  },
  education: {
    level: { type: String, required: true },
    employmentStatus: { type: String, required: true },
    sector: { type: String, required: true },
    duration: { type: String, required: true },
    officeEmail: { type: String, required: true },
    monthlyIncome: [String, String],
    loanRepayment: { type: String, required: true },
  },
  id: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("USERS", usersTestSchema);
