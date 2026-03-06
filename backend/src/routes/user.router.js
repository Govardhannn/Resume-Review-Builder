import express from "express";
import { getjobs, login, logout, otpVerification, register } from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
const route = express.Router();



route.post('/register', register);
route.post('/verify-email',otpVerification);
route.post('/login', login);
route.get('/logout',authMiddleware,logout);
route.get('/get/tranding-jobs',authMiddleware,getjobs);

export default route;