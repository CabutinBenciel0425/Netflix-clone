import { Router } from "express";
import {
  getByCategory,
  getDetails,
  getSimilar,
  getTrailer,
  getTrending,
} from "../controllers/content.controller.js";

const contentRoutes = Router();

contentRoutes.get("/:mediaType/trending", getTrending);

contentRoutes.get("/:mediaType/:id/trailer", getTrailer);

contentRoutes.get("/:mediaType/:id/similar", getSimilar);

contentRoutes.get("/:mediaType/:id/details", getDetails);

contentRoutes.get("/:mediaType/:category", getByCategory);

export default contentRoutes;
