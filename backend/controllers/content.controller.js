import { TMDB_BASE_URL } from "../config/envVars.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";
import { VALID_MEDIA_TYPES } from "../utils/constants.js";
import { getContentDetails } from "../services/getContentDetails.service.js";
import { addSearchHistory } from "../utils/addSearchHistory.js";

import ApiError from "../utils/apiError.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const getTrending = asyncHandler(async (req, res) => {
  const { mediaType } = req.params;

  if (!VALID_MEDIA_TYPES.includes(mediaType)) {
    throw new ApiError(400, "Invalid media type");
  }

  const trending = await fetchFromTMDB(`${TMDB_BASE_URL}/${mediaType}/popular`);

  const splicedTrending = trending.results?.slice(0, 1);

  res.status(200).json({
    success: true,
    trendingContent: splicedTrending[0],
  });
});

export const getTrailer = asyncHandler(async (req, res) => {
  const { id, mediaType } = req.params;

  if (!VALID_MEDIA_TYPES.includes(mediaType)) {
    throw new ApiError(400, "Invalid media type");
  }

  const trailers = await fetchFromTMDB(
    `${TMDB_BASE_URL}/${mediaType}/${id}/videos`,
  );

  res.status(200).json({
    success: true,
    trailers,
  });
});

export const getDetails = asyncHandler(async (req, res) => {
  const { id, mediaType } = req.params;
  const user = req.user;

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const details = await getContentDetails(id, mediaType);

  addSearchHistory(user._id, details, mediaType);

  res.status(200).json({
    success: true,
    details,
  });
});

export const getSimilar = asyncHandler(async (req, res) => {
  const { id, mediaType } = req.params;
  const similarContent = await fetchFromTMDB(
    `${TMDB_BASE_URL}/${mediaType}/${id}/similar`,
  );

  if (!VALID_MEDIA_TYPES.includes(mediaType)) {
    throw new ApiError(400, "Invalid media type");
  }

  res.status(200).json({
    success: true,
    similarContent,
  });
});

export const getByCategory = asyncHandler(async (req, res) => {
  //airing_today - tvshows
  //on_the_air - tvshows
  //upcoming - movies
  //now_playing - movies
  //popular
  //top_rated
  const { category, mediaType } = req.params;
  const categoryList = await fetchFromTMDB(
    `${TMDB_BASE_URL}/${mediaType}/${category}`,
  );

  if (!VALID_MEDIA_TYPES.includes(mediaType)) {
    throw new ApiError(400, "Invalid media type");
  }

  res.status(200).json({
    success: true,
    categoryList: categoryList,
  });
});
