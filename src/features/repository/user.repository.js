
import UserModel from '../models/user.model.js';
import mongoose  from 'mongoose';

class UserRepository {

  // Dashboard Data
  // async dashboard(userId) {
  //   try {
    
  //     // Total Amount 
  //     const totalAmount = await AccountModel.aggrefate([
  //       {$match: {userId: new mongoose.Types.ObjectId(userId)}},
  //       {
  //         $group: {
  //           _id: null,
  //           totalAmount: {$sum: {$toDouble: "$amount"}}
  //         }
  //       }
  //     ]);

  //     // Total Expense
      

  //     // Total Income

  //     // End Total Income 

  //     return totalAmount;
  //   } catch (err) {
  //     console.log("Error:", err);
  //   }
  // }
  
  // End

  async create(userData) {
    try {
      const user = new UserModel(userData);
      return await user.save();
    } catch (err) {
      console.log("Error ", err);
    }
  }

  async findbyEmail(email) {
    try {
      return await UserModel.findOne({ email: email });
    } catch (err) {
      console.log("Error ", err);
    }
  }

}

export default UserRepository;