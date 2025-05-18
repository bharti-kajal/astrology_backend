import express from "express";
import NotificationController from "../../features/controllers/Notification.controller.js";
import UserController from "../../features/controllers/User.controller.js";
const userRouter = express.Router();
const notification = new NotificationController();
const user = new UserController();

userRouter.get("/notifications", (req, res) => {
notification.list(req, res)
});

userRouter.post("/add-notification", (req, res) => {
    notification.add(req, res)
});

userRouter.post("/send-otp", (req, res) => {
    user.sendOtp(req, res)
});

userRouter.post("/verify-otp", (req, res) => {
    user.verifyOtp(req, res)
});

export default userRouter;