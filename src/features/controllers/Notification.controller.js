import CommonRepository from "../repository/common.repository.js";
import notificationModel from '../models/notification.model.js';

class NotificationController {

  constructor() {
    this.commonRepository = new CommonRepository();
  }

  async add(req, res) {
    try {
        const {title, description } = req.body;
        const data = {
          title, description
        };
        const result = await this.commonRepository.add(data, notificationModel);
        if(result){
          res.status(201).json({status: true, message: "Noification Add Successfully"});
        }else{
          res.status(400).json({status: false, message: "Something Went Wrong!"});
        }
    } catch (err) {
      console.error("Error in controller", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async list(req, res) {
    try {
      const result = await this.commonRepository.get(notificationModel);
      if(result){
         res.status(200).json({status: true, data: result});
      }else{
        res.status(400).json({status: false, message: "Something Went Wrong!"});
      }
    } catch (err) {
      console.error("Error in controller", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }


}

export default NotificationController;
