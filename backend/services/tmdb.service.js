import { TMDB_API_KEY } from "../config/envVars.js";
import axios from "axios";
import ApiError from "../utils/apiError.js";

export const fetchFromTMDB = async (url) => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + TMDB_API_KEY,
    },
  };

  const response = await axios.get(url, options);

  if (response.status !== 200) {
    throw new ApiError(response.status, "Failed to fetch data from TMDB");
  }

  return response.data;
};
