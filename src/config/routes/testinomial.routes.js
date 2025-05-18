import express from 'express';
import TestinomialController from '../../features/controllers/Testinomial.controller.js';
const testinomailRouter = express.Router();
const testinomialController = new TestinomialController();
import { upload } from '../../features/middlewares/file-upload.middleware.js';

testinomailRouter.post("/add", upload.single("image"), (req, res) => {
testinomialController.add(req, res)
});

testinomailRouter.get("/lists", (req, res) => {
    testinomialController.list(req, res)
});

testinomailRouter.post("/update", upload.single("image"), (req, res) => {
    testinomialController.update(req, res)
});

testinomailRouter.post("/delete", (req, res) => {
    testinomialController.delete(req, res)
});

export default testinomailRouter;