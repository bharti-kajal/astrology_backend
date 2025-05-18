import CommonRepository from "../repository/common.repository.js";
import planModel from '../models/plan.model.js';
class PlanController{

    constructor(){
        this.commonRepository = new CommonRepository();
    }

    async list(req, res){
        try{

        }catch(err){
            console.log("error in controller", err);
        }
    }

    async add(req, res){
         try{

            console.log("req.body", req.body);
            // const { price, extra, status } = req.body;
            // const data = {price, extra, status};

            // const result = this.commonRepository.add(data, planModel);
            // if(result){
            //     return res.status(201).json({status: true, message: "Pricing Plan Created Successfully!"});
            // }else{
            //     return res.status(400).json({status: false, message: "something Went Wrong"});
            // }
        }catch(err){
            console.log("error in controller", err);
        }
    }

    async update(req, res){
         try{

        }catch(err){
            console.log("error in controller", err);
        }
    }

    async delete(req, res){
         try{

        }catch(err){
            console.log("error in controller", err);
        }
    }
}

export default PlanController;
