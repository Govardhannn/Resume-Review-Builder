import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import sendOtp from "../utils/send.otp.js";


export const register = async (req, res) => {
   try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
         return res.status(401).json({ message: "all the fields are required" });
      }
      const isUserExist = await userModel.findOne({
         email,
         isVerified: true
      })
      if (isUserExist) {
         return res.status(401).json({ message: "user with this email is already registred" });
      }
      const registrationAttemd = await userModel.find({ email,  });
      if (registrationAttemd.length > 3) {
         return res.status(401).json({ message: "try again later" })
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const verificationCode = Math.floor(100000 + Math.random() * 900000);
      const verificationExpiry = Date.now() + 10 * 60 * 1000;
      const user = await userModel.create({
         userName: username,
         email,
         password: hashPassword,
         verificationCode: verificationCode,
         verificationExpiry: verificationExpiry,
      })
      if (!user) {
         return res.status(501).json({ message: "user is not created" });
      }
      sendOtp(user.verificationCode, user.email);
      return res.status(201).json({ user, message: "user created sucessfully" });
   }
   catch (error) {
      return res.status(500).json({ message: error.message });
   }
}

export const otpVerification = async (req, res) => {
   try {
      const { otp } = req.body;
      if (!otp) {
         return res.status(401).json({ message: "pelase enter your otp" });
      }
      const user = await userModel.findOne({
         verificationCode: otp,
         verificationExpiry: { $gt: Date.now() }
      })
      if (!user) return res.status(401).json({ message: "otp is invalid or expired" });
      user.isVerified = true;
      user.verificationCode = undefined;
      user.verificationExpiry = undefined;
      await user.save();
      return res.status(200).json({ user, message: "otp is valid" });
   }
   catch (error) {
      return res.status(501).json({ message: error.message });
   }
}

export const login = async (req, res) => {
   try {
      const { email, password } = req.body;
      if (!email || !password) {
         return res.status(401).json({ message: "email or password is invalid" });
      }
      const existedUser = await userModel.findOne({ email })
      if (!existedUser) {
         return res.status(401).json({ message: "please register fast" });
      }
      const hashedPassword = await bcrypt.compare(password, existedUser.password);
      if (!hashedPassword) {
         return res.status(401).json({ message: "email or password is invalid" });
      }
      const authtoken = jwt.sign(
         { _id: existedUser._id },
         process.env.ACCESS_TOKEN_SECRET,
         { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
      )
      if (!authtoken) {
         return res.status(501).json({ message: "token missmatched" });
      }
      res.cookie("token", authtoken, {
         httpOnly: true,
         maxAge: 1 * 24 * 60 * 60 * 1000
      });
      return res.status(200).json({ existedUser, authtoken, message: "user login sucessfull" });
   }
   catch (error) {
      return res.status(501).json({ message: error.message });
   }
}

export const logout = async (req, res) => {
   try {
          
      res.clearCookie("token");
      return res.status(200).json({ message: "user logout sucessfully" });

   }
   
   catch (error) {
      return res.status(500).json({ message: error.message })
   }
}

export const getjobs = async (req, res) => {
  
};



