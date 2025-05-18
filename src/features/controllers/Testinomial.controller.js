import TestinomialModel from '../models/testinomial.model.js';
import CommonRepository from '../repository/common.repository.js';
class TestinomialController {
  constructor() {
    this.commonRepository = new CommonRepository();
  }

  async list(req, res) {
    try {
          const cond = { status: true };
          const result = await this.commonRepository.get(TestinomialModel, cond);
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
        const {name, comment, status} = req.body;
        const fileName = req.file.filename;
        const userData = {name, comment, status, image: fileName};
        const result = await this.commonRepository.add(userData, TestinomialModel);
        if(result){
            res.status(200).json({status: true, message: "Testinomial Add Successfully!"});
        }else{
            res.status(400).json({status: false, message: "Something Went Wrong!"});
        }

    } catch (err) {
      console.log("Error in Controller", err);
    }
  }

async update(req, res){
  try{
    const { TestinomialId, name, comment, status} = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Image file is missing" });
    }

    const fileName = req.file.filename;
    const data = {name, comment, status, image: fileName};

    let result = await this.commonRepository.update(TestinomialId, data, TestinomialModel);
    if (result) {
      res
        .status(200)
        .json({ status: true, message: "Testinomial Updated Successfully!" });
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

  async delete(req, res) {
    try {
          const TestinomialId = req.body.TestinomialId;
          if(!TestinomialId){
            res.status(200).json({status: false, message: "TestinomialId Not correct"});
          }
    
          const filter = {"_id": TestinomialId};
          const update = {"status": false};
          
          const result = await this.commonRepository.delete(filter, update, TestinomialModel);
          if(result){
            res.status(200).json({status: 200, message: "Testinomial Deleted Successfully!"});
          }
          else{
            res.status(400).json({status: 400, message: "Something Went Wrong!"});
          }
        } catch (err) {
          console.error("Error in controller", err);
          res.status(500).json({ message: "Internal Server Error" });
        }
  }

}

export default TestinomialController;
