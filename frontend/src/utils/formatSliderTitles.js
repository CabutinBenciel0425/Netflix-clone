export const formatSliderTitles = (title = "", contentType) => {
  const formattedCategoryName = title
    .split("_")
    .map((item) => item.split("").at(0).toUpperCase() + item.slice(1))
    .join(" ");
  const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

  if (title.length === 0) {
    return `${formattedContentType}`;
  } else {
    return `${formattedCategoryName} ${formattedContentType}`;
  }
};
