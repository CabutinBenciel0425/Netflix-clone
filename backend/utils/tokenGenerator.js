import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY, NODE_ENV } from "../config/envVars.js";

//generate a token and set a cookie
export const tokenGenerator = (userId, res) => {
  const token = jwt.sign({ userId }, JWT_SECRET_KEY, { expiresIn: "7d" });

  res.cookie("authToken", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
    secure: NODE_ENV !== "development",
  });

  return token;
};
