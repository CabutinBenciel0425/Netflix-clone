import express from "express";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import { NODE_ENV, PORT } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import { authHandler } from "./middleware/authHandler.js";
import errorMiddleware from "./middleware/error.middleware.js";
import contentRoutes from "./routes/content.route.js";
import searchRoutes from "./routes/search.route.js";
import path from "path";

const app = express();

const __dirname = path.resolve();

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/content", authHandler, contentRoutes);
app.use("/api/v1/search", authHandler, searchRoutes);

app.use(errorMiddleware);

if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
  connectDB();
});
