import { Router } from "express";
import {
  clearHistory,
  deleteHistory,
  getPersonCredits,
  getPersonDetails,
  getSearchHistory,
  searchMovie,
  searchPerson,
  searchTv,
} from "../controllers/search.controller.js";

const searchRoutes = Router();

searchRoutes.get("/person/:query", searchPerson);

searchRoutes.get("/person/:id/details", getPersonDetails);

searchRoutes.get("/person/:id/:mediaType", getPersonCredits);

searchRoutes.get("/movie/:query", searchMovie);

searchRoutes.get("/tv/:query", searchTv);

searchRoutes.get("/history", getSearchHistory);

searchRoutes.delete("/history", clearHistory);

searchRoutes.delete("/history/:id", deleteHistory);

export default searchRoutes;
