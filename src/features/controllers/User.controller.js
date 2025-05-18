import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import UserRepository from "../repository/user.repository.js";
import { sendResetEmail } from "../helper/email.js";
import { sendOTP, verifyOTP } from "../helper/twilio.js";

class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  // 1. Send OTP
  async sendOtp(req, res) {
    try {
      let phoneNumber = req.body.phone;
      console.log("phoneNumber", phoneNumber);
      const result = await sendOTP(phoneNumber);
      if (result) {
        res
          .status(200)
          .json({ success: true, message: "OTP sent successfully" });
      } else {
        res.status(400).json({ success: false, message: "Failed to send OTP" });
      }
    } catch (err) {
      console.log("Error in controller", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // 2. Verify OTP
  async verifyOtp(req, res) {
    try {
      const { phone, otp } = req.body;
      const result = await verifyOTP(phone, otp);
      if (result) {
        res
          .status(200)
          .json({ success: true, message: "Verify OTP successfully" });
      } else {
        res.status(400).json({ success: false, message: "Failed to send OTP" });
      }
    } catch (err) {
      console.log("Error in controller", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  
}

export default UserController;
