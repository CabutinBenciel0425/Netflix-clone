import { VALID_MEDIA_TYPES } from "../utils/constants.js";
import { TMDB_BASE_URL } from "../config/envVars.js";
import { fetchFromTMDB } from "./tmdb.service.js";

import ApiError from "../utils/apiError.js";

export const getContentDetails = async (id, mediaType) => {
  if (!VALID_MEDIA_TYPES.includes(mediaType)) {
    throw new ApiError(400, "Invalid media type");
  }

  return await fetchFromTMDB(`${TMDB_BASE_URL}/${mediaType}/${id}`);
};
