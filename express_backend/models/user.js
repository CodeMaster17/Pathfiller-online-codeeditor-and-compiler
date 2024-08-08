const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    account_type: {
      type: String,
      enum: ["Admin", "Member", "User"],
      required: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    is_approved: {
      type: Boolean,
      default: true,
    },
    additional_details: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Profile",
    },
    token: {
      type: String,
    },
    reset_password_expires: { //WIP: reset password
      type: Date,
    },
    image: {
      type: String,
    },
  },
  { time_stamps: true } //WIP: time stamp
)

module.exports = mongoose.model("user", userSchema)
