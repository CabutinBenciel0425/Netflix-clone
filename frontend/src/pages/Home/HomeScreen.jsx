import { Link } from "react-router-dom";
import { Info, Play } from "lucide-react";
import {
  MOVIE_CATEGORIES,
  ORIGINAL_IMAGE_BASE_URL,
  TV_CATEGORIES,
} from "../../utils/constants";
import { getReleaseYear } from "../../utils/getReleaseYear";
import { useGetTrending } from "../../hooks/useGetTrending";
import { useContentStore } from "../../store/content";

import Navbar from "../../components/Navbar";
import ShimmerEffect from "../../components/ShimmerEffect";
import ContentSlider from "../../components/ContentSlider";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

function HomeScreen() {
  const { trendingContent } = useGetTrending();
  const { contentType } = useContentStore();

  useDocumentTitle(
    `${contentType === "movie" ? "Movies" : "TV Shows"} | Netflix Clone`,
  );

  if (!trendingContent) return <ShimmerEffect />;

  return (
    <>
      <div className="relative h-screen text-white">
        <Navbar />

        <img
          src={ORIGINAL_IMAGE_BASE_URL + trendingContent?.backdrop_path}
          alt={trendingContent?.title}
          className="absolute top-0 left-0 w-full h-full object-cover -z-50"
        />

        <div
          className="absolute top-0 left-0 w-full h-full bg-black/50 -z-50"
          aria-hidden="true"
        />

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
          <div className="bg-linear-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10" />

          <div className="max-w-2xl">
            <h1 className="mt-4 text-6xl font-extrabold text-balance">
              {trendingContent?.title || trendingContent?.name}
            </h1>

            <p className="ml-0.5 mt-2 text-lg">
              {getReleaseYear(
                trendingContent?.release_date ||
                  trendingContent?.first_air_date,
              )}{" "}
              | {trendingContent?.adult ? "18+" : "PG-13"}
            </p>

            <p className="mt-4 text-lg">{trendingContent?.overview}</p>
          </div>

          <div className="flex mt-8">
            <Link
              to={`/watch/${contentType}/${trendingContent?.id}`}
              className="bg-white hover:bg-white/80 text-black/75 font-bold py-2 px-4 rounded mr-4 flex items-center transition-all duration-300 ease-in-out"
            >
              <Play className="size-6 inline-block mr-2 fill-black/85" />
              Play
            </Link>

            <Link
              to={`/watch/${contentType}/${trendingContent?.id}`}
              className="bg-gray-500/70 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-4 flex items-center transition-all duration-300 ease-in-out"
            >
              <Info className="size-6 inline-block mr-2" />
              More Info
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10 bg-black py-10">
        {contentType === "movie"
          ? MOVIE_CATEGORIES.map((category) => (
              <ContentSlider
                mode="category"
                key={category}
                category={category}
              />
            ))
          : TV_CATEGORIES.map((category) => (
              <ContentSlider
                mode="category"
                key={category}
                category={category}
              />
            ))}
      </div>
    </>
  );
}

export default HomeScreen;
