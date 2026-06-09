import { JWT_SECRET_KEY } from "../config/envVars.js";
import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError.js";
import asyncHandler from "./asyncHandler.js";
import User from "../models/user.model.js";

export const authHandler = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.authToken;

  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user || !decoded) {
      throw new ApiError(401, "Invalid or expired token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token");
  }
});
