import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/user.model.js";

export const addSearchHistory = async (userId, details, type) => {
  console.log(details, type);
  if (!details || !type) return;

  const fallbackImage =
    type === "person" ? "/default-person.png" : "/default-poster.png";
  const imagePath =
    type === "person" ? details.profile_path : details.poster_path;

  await User.findByIdAndUpdate(userId, {
    $push: {
      searchHistory: {
        id: details.id,
        image: imagePath || fallbackImage,
        title: type === "movie" ? details.title : details.name,
        searchType: type,
        createdAt: new Date(),
      },
    },
  });
};
