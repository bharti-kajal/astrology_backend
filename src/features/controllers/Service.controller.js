import ServiceModel from "../models/service.model.js";
import CommonRepository from '../repository/common.repository.js';
class ServiceController {
  constructor() {
    this.commonRepository = new CommonRepository();
  }

  async list(req, res) {
    try {
          const cond = { status: true };
          const result = await this.commonRepository.get(ServiceModel, cond);
          if (result) {
            res.status(200).json({ status: true, data: result });
          } else {
            res
              .status(400)
              .json({ status: false, message: "Something went wrong" });
          }
        } catch (err) {
          console.log("Error in Controller", err);
          res.status(500).json({ status: false, message: "Internal Server Error" });
        }
  }

  async add(req, res) {
    try {
        const {name, description, status} = req.body;
        const fileName = req.file.filename;
        const userData = {name, description, status, image: fileName};
        const result = await this.commonRepository.add(userData, ServiceModel);
        if(result){
            res.status(200).json({status: true, message: "Service Add Successfully!"});
        }else{
            res.status(400).json({status: false, message: "Something Went Wrong!"});
        }

    } catch (err) {
      console.log("Error in Controller", err);
    }
  }

async update(req, res){
  try{
    const { serviceId, name, description, status} = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Image file is missing" });
    }

    const fileName = req.file.filename;
    const data = {name, description, status, image: fileName};
    let result = await this.commonRepository.update(serviceId, data, ServiceModel);
    if (result) {
      res
        .status(200)
        .json({ status: true, message: "Service Updated Successfully!" });
    } else {
      res
        .status(400)
        .json({ status: false, message: "Something Went Wrong!" });
    }

  }
  catch (err) {
    console.error("Error in controller", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

  async delete() {
    try {
          const serviceId = req.body.serviceId;
          if(!serviceId){
            res.status(200).json({status: false, message: "serviceId Not correct"});
          }
    
          const filter = {"_id": serviceId};
          const update = {"status": false};
          
          const result = await this.commonRepository.delete(filter, update, ServiceModel);
          if(result){
            res.status(200).json({status: true, message: "Service Deleted Successfully!"});
          }
          else{
            res.status(400).json({status: false, message: "Something Went Wrong!"});
          }
        } catch (err) {
          console.error("Error in controller", err);
          res.status(500).json({ message: "Internal Server Error" });
        }
  }

  async serviceDetails(req, res){
    try{
      const serviceId = req.params.id;
      if(!req.params.id){
        return res.status(400).json({status: false, message: "Something Went wrong"});
      }
      const result = await this.commonRepository.getById(serviceId, ServiceModel);
      if(result){
        res.status(200).json({status: true, data: result});
      }else {
        res.status(400).json({status: false, message: "Somethinf Went Wrong"});
      }
    }catch (err) {
          console.error("Error in controller", err);
          res.status(500).json({ message: "Internal Server Error" });
        }
  }

}

export default ServiceController;
