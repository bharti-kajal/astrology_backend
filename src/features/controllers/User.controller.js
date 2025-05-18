import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import UserModel from '../models/user.model.js';
import CommonRepository from "../repository/common.repository.js";

// import { sendResetEmail } from "../helper/email.js";
// import { sendOTP, verifyOTP } from "../helper/twilio.js";

class UserController {
  constructor() {
    this.commonRepository = new CommonRepository();
  }

  // Get the user Lists 
  async userList(req, res){
    try{
      const condition = {role: 'user'};
      const result = await this.commonRepository.get(UserModel, condition, 'name email gender address');
      if(result){
        return res.status(200).json({status: true, data: result});
      }else{
        return res.status(400).json({status: false,message: "Something Went Wrong"});
      }
    }
    catch(err){
      console.log("Error", err);
    }
  }

  // Astrologer Lists 
  
    async astrologerList(req, res){
    try{
      const condition = {role: 'astrologer'};
      const result = await this.commonRepository.get(UserModel, condition, 'name email gender address');
      if(result){
        return res.status(200).json({status: true, data: result});
      }else{
        return res.status(400).json({status: false,message: "Something Went Wrong"});
      }
    }
    catch(err){
      console.log("Error", err);
    }
  }

  // 1. Sign Up Role Based On Users
  async userSignup(req, res){
      try{

        const { name, email, pob, gender, address, dob, tob, pincode, city, role, password, confirm_password } = req.body;
        
        // Validation check 
        if(!name || !email || !pob || !gender || !address || !dob || !tob || !pincode || !city || !password || !confirm_password)
        {
          return res.status(400).json({status: false, message: "Required All fileds"});
        }

        // 2. Confirm password and Password Same 
        if(password !== confirm_password)
        {
          return res.status(400).json({status: false, message: "Password and Confirm Password not match"});
        }

        // Check if the user already exists
        const existingUser = await this.commonRepository.findbyEmail(email, UserModel);
        if (existingUser) {
          return res
            .status(400)
            .json({ status: false, message: "Email already in use!" });
        }

        // 3. Convert HAsh Password 
        const hashPassword = await bcrypt.hash(password, 12);

        // 5. Add data to DB
        const data = {name, email, pob, gender, address, dob, birthtime: tob, pincode, city, role, password: hashPassword};
        const result = await this.commonRepository.add(data, UserModel);
        if(result){
          return res.status(201).json({status: true, message: "User Created Successfully!"});
        }else{
          return res.status(400).json({status: false, message: "Something went Wrong"});
        }
      }catch(err){
        console.log("Error in controller", err);
        return res.status(500).json({status: false, message: "Internal Server Error"});
      }
  }

  // 2. User Sign in based on roles 
  async signIn(req, res) {
      try {
        const { email, password, role } = req.body;
  
        // Basic validation
        if (!email || !password) {
          return res
            .status(400)
            .json({ status: false, message: "All fields are required!" });
        }
  
        // 1. check if email found or not
        const emailExist = await this.commonRepository.findbyEmail(email, UserModel);
        if (emailExist) {
          // Match the password
          const match = await bcrypt.compare(password, emailExist.password);
          if (match) {
            const token = jwt.sign(
              {
                userId: emailExist._id,
                role: role
              },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "1h" }
            );
            console.log("token", token);
            return res.status(200).json({ status: true, token: token });
          } else {
            return res
              .status(400)
              .json({ status: false, message: "Invalid Credentials" });
          }
        } else {
          return res
            .status(400)
            .json({ status: false, message: "Invalid Credentials" });
        }
      } catch (err) {
        // throw err;
        console.log("Error", err);
  
        return res
          .status(500)
          .json({ status: false, message: "Internal server error" });
      }
    }

}

export default UserController;
