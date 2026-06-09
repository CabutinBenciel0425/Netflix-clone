import { useContentStore } from "../store/content";
import { useGetContentsByCategory } from "../hooks/useGetContentsByCategory";
import { useGetSimilarContents } from "../hooks/useGetSimilarContent";
import { useGetPersonContents } from "../hooks/useGetPersonContents";
import { Link } from "react-router-dom";
import { SMALL_IMAGE_BASE_URL } from "../utils/constants";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatSliderTitles } from "../utils/formatSliderTitles";

function ContentSlider({ mode = "category", category, id, mediaType, title }) {
  const { contentType } = useContentStore();
  const [showArrows, setShowArrows] = useState(false);
  const sliderRef = useRef(null);

  const isCategoryMode = mode === "category";
  const isSimilarMode = mode === "similar";
  const isPersonMode = mode === "person";

  const { contents: categoryData } = useGetContentsByCategory(
    contentType,
    isCategoryMode ? category : null,
  );

  const { similarContents } = useGetSimilarContents(
    isSimilarMode ? id : undefined,
    isSimilarMode ? mediaType : undefined,
  );

  const { contents: personContents } = useGetPersonContents(
    isPersonMode ? id : undefined,
    isPersonMode ? mediaType : undefined,
  );

  const contents = isCategoryMode
    ? categoryData
    : isSimilarMode
      ? similarContents
      : personContents;

  const uniqueResults = contents
    ? [...new Map(contents.results.map((item) => [item.id, item])).values()]
    : [];

  const sliderTitle =
    title ||
    (isCategoryMode
      ? formatSliderTitles(category, contentType)
      : isSimilarMode
        ? "More Like This"
        : "");

  const linkType = isPersonMode ? mediaType : mediaType || contentType;

  const scrollLeft = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };

  const scrollRight = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };

  if (!contents) return null;

  return (
    <div
      className="bg-black text-white relative px-5 md:px-20"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="mb-4 font-bold text-2xl">{sliderTitle}</h2>

      <div
        className="flex space-x-4 overflow-x-scroll scrollbar-hide"
        ref={sliderRef}
      >
        {uniqueResults.length > 0 ? (
          uniqueResults.map((item) => {
            if (!item.backdrop_path && !item.poster_path) return null;
            return (
              <Link
                to={`/watch/${linkType}/${item.id}`}
                className="min-w-62.5 relative group"
                key={item.id}
              >
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={
                      SMALL_IMAGE_BASE_URL +
                      (item.poster_path || item.backdrop_path)
                    }
                    alt={item.title || item.name}
                    className="transition-transform duration-300 ease-in-out group-hover:scale-125 mb-15"
                  />
                  <p className="mt-7 text-center font-semibold text-lg">
                    {item.title || item.name}
                  </p>
                </div>
              </Link>
            );
          })
        ) : (
          <p>No content found for this category</p>
        )}
      </div>

      {uniqueResults.length > 0 && showArrows && (
        <>
          <button
            className="absolute top-1/2 -translate-y-1/2 left-5 md:left-20 flex items-center justify-center size-12 rounded-full bg-black opacity-50 hover:opacity-70 text-white z-10 cursor-pointer transition-all"
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-5 md:right-20 flex items-center justify-center size-12 rounded-full bg-black opacity-50 hover:opacity-70 text-white z-10 cursor-pointer transition-all"
            onClick={scrollRight}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
}

export default ContentSlider;
