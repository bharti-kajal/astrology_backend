import express from 'express';
const planRouter = express.Router();
import PlanController from '../../features/controllers/Plan.controller.js';

const plan = new PlanController();

planRouter.post("/add", (req, res) => {
    plan.add(req, res)
});

planRouter.get("/list", (req, res) => {
    plan.list(req, res)
});

export default planRouter;