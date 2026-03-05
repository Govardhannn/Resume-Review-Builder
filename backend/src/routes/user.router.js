import express from "express";
import { login, otpVerification, register } from "../controllers/user.controller.js";
const route = express.Router();



route.post('/register', register);
route.post('/verify-email',otpVerification);
route.post('/login', login);


export default route;