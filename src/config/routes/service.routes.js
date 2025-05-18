import express from 'express';
import ServiceController from '../../features/controllers/Service.controller.js';
const serviceRouter = express.Router();
const serviceController = new ServiceController();
import { upload } from '../../features/middlewares/file-upload.middleware.js';

serviceRouter.post("/add", upload.single("image"), (req, res) => {
serviceController.add(req, res)
});

serviceRouter.get("/lists", (req, res) => {
    serviceController.list(req, res)
});

serviceRouter.post("/update", upload.single("image"), (req, res) => {
    serviceController.update(req, res)
});

serviceRouter.post("/delete", (req, res) => {
    serviceController.delete(req, res)
});

serviceRouter.get("/:id", (req, res) => {
    serviceController.serviceDetails(req, res)
});

export default serviceRouter;