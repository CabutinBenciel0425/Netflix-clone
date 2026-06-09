import { TMDB_BASE_URL } from "../config/envVars.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";
import { addSearchHistory } from "../utils/addSearchHistory.js";
import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import User from "../models/user.model.js";
import { VALID_MEDIA_TYPES } from "../utils/constants.js";

const searchContent = (type) => {
  return asyncHandler(async (req, res) => {
    const { query } = req.params;

    if (!query) {
      throw new ApiError(400, "Search keyword is required");
    }
    const results = await fetchFromTMDB(
      `${TMDB_BASE_URL}/search/${type}?query=${encodeURIComponent(query)}`,
    );

    if (results.total_results === 0) {
      throw new ApiError(404, `No results found for "${query}"`);
    }

    res.status(200).json({
      success: true,
      data: results,
    });
  });
};

export const searchPerson = searchContent("person");

export const searchMovie = searchContent("movie");

export const searchTv = searchContent("tv");

// export const addSearch = asyncHandler(async (req, res) => {
//   const { id, type } = req.body;
//   const { user } = req.user;

//   if (!user) {
//     throw new ApiError(404, "User not found");
//   }

//   if (!id || !type) {
//     throw new ApiError(404, "id or type is not defined");
//   }

//   addSearchHistory(user._id, id, type);

//   res.status(200).json({
//     success: true,
//     message: "Search history successfully added",
//   });
// });

export const getSearchHistory = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json({
    success: true,
    searchHistory: user.searchHistory,
  });
});

export const clearHistory = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.searchHistory = [];
  await user.save();

  res.status(200).json({
    success: true,
    message: "All search history has been deleted",
  });
});

export const deleteHistory = asyncHandler(async (req, res) => {
  const historyId = req.params.id;
  const user = req.user;

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const historyItem = user.searchHistory.find(
    (item) => item.id.toString() === historyId,
  );

  if (!historyItem) {
    throw new ApiError(404, "Search history not found");
  }

  await User.findByIdAndUpdate(user._id, {
    $pull: { searchHistory: { id: historyItem.id } },
  });

  res.status(200).json({
    success: true,
    message: "Successfully deleted",
  });
});

export const getPersonDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  if (!id) {
    throw new ApiError(404, "Artist not found");
  }

  const details = await fetchFromTMDB(`${TMDB_BASE_URL}/person/${id}`);

  if (!details) {
    throw new ApiError(404, `No results found`);
  }

  addSearchHistory(user._id, details, "person");

  res.status(200).json({
    success: true,
    personDetails: details,
  });
});

export const getPersonCredits = asyncHandler(async (req, res) => {
  const { id, mediaType } = req.params;
  const user = req.user;

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!id) {
    throw new ApiError(404, "Artist not found");
  }

  if (!VALID_MEDIA_TYPES.includes(mediaType)) {
    throw new ApiError(400, "Invalid media type");
  }

  const credits = await fetchFromTMDB(
    `${TMDB_BASE_URL}/person/${id}/${mediaType}_credits`,
  );

  if (!credits.cast.length === 0) {
    throw new ApiError(404, `No results found`);
  }

  res.status(200).json({
    success: true,
    type: mediaType,
    credits,
  });
});
