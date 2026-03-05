import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
   try {

      const token = req.cookies.token;

      if (!token) {
         return res.status(401).json({ message: "Unauthorized user" });
      }

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      if (!decoded) {
         return res.status(401).json({ message: "Invalid token" });
      }

      const authenticatedUser = await userModel.findById(decoded.id);

      if (!authenticatedUser) {
         return res.status(401).json({ message: "User not found" });
      }

      req.userId = authenticatedUser._id;

      next();

   } catch (error) {
      return res.status(401).json({ message: "Authentication failed" });
   }
};

export default authMiddleware;