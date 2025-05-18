import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
    },
    email: {
      type: String,
      required: true,
      minLength: 3,
    },
    pob: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    birthtime: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "astrologer", "adminLength"],
      default: "user"
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", userSchema);
export default UserModel;
