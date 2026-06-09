import dotenv from "dotenv";

dotenv.config();

export const {
  MONGO_URI,
  PORT = 3000,
  NODE_ENV,
  JWT_SECRET_KEY,
  TMDB_API_KEY,
  TMDB_BASE_URL,
} = process.env;
