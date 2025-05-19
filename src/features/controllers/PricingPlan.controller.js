import CommonRepository from "../repository/common.repository.js";
import PlanModel from "../models/plan.model.js";

class PricingPlan {

    constructor(){
        this.commonRepository = new CommonRepository();
    }

    // 1. Add Pricing Plan 
    async add(req, res){
        try{
            const {planName, price, extra} = req.body;
            const data = {planName, price, extra};
            const result = await this.commonRepository.add(data, PlanModel);
            if(result){
                res.status(201).json({status: 201, message: "Pricing Plan Created!"});
            }else{
                 res.status(400).json({status: 400, message: "Something Went Wrong"});
            }
        }catch(err){
            console.error("Error in controller", err);
             res.status(500).json({status: 500, message: "Internal Server Error"});
        }
    }

    // List 
    async list(req, res) {
        try {
            const cond = {};
          const result = await this.commonRepository.get(PlanModel, cond, 'extra price status');
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
    
     // Delete 
      async delete(req, res) {
        try {
          const planId = req.body.planId;
          
          if(!planId){
            res.status(400).json({status: false, message:"planId Not Found in Our DB Plan Lists"});
          }
    
          const filter = { _id: planId };
          const update = { status: 0 };
          let result = await this.commonRepository.delete(
            filter,
            update,
            PlanModel
          );
    
          if (result) {
            res
              .status(200)
              .json({
                status: true,
                message: "Pricing Plan Deleted Successfully!",
              });
          } else {
            res
              .status(400)
              .json({ status: false, message: "Something Went Wrong!" });
          }
        } catch (err) {
          console.log("Error in controller", err);
        }
      }
    
      // Update Blog Details
      async update(req, res) {
        try {
          const { planName, price, planId, extra, status } = req.body;
          const data = { planName, price, extra, status };
          let result = await this.commonRepository.update(
            planId,
            data,
            PlanModel
          );
          if (result) {
            return res
              .status(200)
              .json({
                status: true,
                message: "Pricing Plan Updated Successfully!",
              });
          }
        } catch (err) {

          console.log(err);
          return res
            .status(500)
            .json({
              status: false,
              message: "Internal Server Error",
            });
        }
      }
}

export default PricingPlan;