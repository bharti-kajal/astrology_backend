import express from "express";
const pricingRoutes = express.Router();
import PricingPlan from "../../features/controllers/PricingPlan.controller.js";

const pricing = new PricingPlan();

pricingRoutes.post("/add-plan", (req, res) => {
  console.log("Received at route:", req.body);
  pricing.add(req, res);
});

pricingRoutes.get("/lists", (req, res) => {
  pricing.list(req, res);
});

pricingRoutes.delete("/delete", (req, res) => {
  pricing.delete(req, res);
});

pricingRoutes.post("/update", (req, res) => {
  pricing.update(req, res);
});

export default pricingRoutes;