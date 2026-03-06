import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
   try {

      console.log("---- AUTH MIDDLEWARE START ----");

      const token = req.cookies.token;

      console.log("Token from cookie:", token);

      if (!token) {
         console.log("No token found");
         return res.status(401).json({
            message: "Unauthorized user"
         });
      }

      const decoded = jwt.verify(
         token,
         process.env.ACCESS_TOKEN_SECRET
      );

      console.log("Decoded token:", decoded);

      const authenticatedUser = await userModel.findById(decoded._id);

      console.log("Authenticated user:", authenticatedUser);

      if (!authenticatedUser) {
         console.log("User not found in database");
         return res.status(401).json({
            message: "User not found"
         });
      }

      req.userId = authenticatedUser._id;

      console.log("User authenticated successfully");
      console.log("---- AUTH MIDDLEWARE END ----");

      next();

   } catch (error) {

      console.log("Auth middleware error:", error.message);

      return res.status(401).json({
         message: "Authentication failed"
      });

   }
};

export default authMiddleware;