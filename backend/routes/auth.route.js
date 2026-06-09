import { Router } from "express";

import {
  signout,
  signIn,
  signUp,
  authCheck,
} from "../controllers/auth.controller.js";
import { authHandler } from "../middleware/authHandler.js";

const authRoutes = Router();

authRoutes.post("/sign-up", signUp);

authRoutes.post("/sign-in", signIn);

authRoutes.post("/sign-out", signout);

authRoutes.get("/authCheck", authHandler, authCheck);

export default authRoutes;
