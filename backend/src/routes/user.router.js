import express from "express";
import { login, logout, otpVerification, register } from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
const route = express.Router();



route.post('/register', register);
route.post('/verify-email',otpVerification);
route.post('/login', login);
route.get('/logout',authMiddleware,logout);

export default route;