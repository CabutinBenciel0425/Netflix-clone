import { useParams } from "react-router-dom";
import { useGetTrailer } from "../hooks/useGetTrailer";
import { useGetDetails } from "../hooks/useGetDetails";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatReleaseDate } from "../utils/formatReleaseDate";

import { ORIGINAL_IMAGE_BASE_URL } from "../utils/constants";

import ReactPlayer from "react-player";

import Navbar from "../components/Navbar";
import FullPageSpinner from "../components/FullPageSpinner";
import ContentSlider from "../components/ContentSlider";
import NotFoundPage from "../components/NotFoundPage";
import { useContentStore } from "../store/content";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

function WatchPage() {
  const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0);
  const { id, type } = useParams();
  const { setContentType } = useContentStore();

  const { trailerContent, isLoading: isLoadingTrailer } = useGetTrailer(
    id,
    type,
  );
  const { details, isLoading: isLoadingDetails } = useGetDetails(id, type);

  const leftSliderHandler = () =>
    setCurrentTrailerIndex((prev) => (prev !== 0 ? prev - 1 : prev));

  const rightSliderHandler = () =>
    setCurrentTrailerIndex((prev) =>
      prev !== trailerContent.results.length - 1 ? prev + 1 : prev,
    );

  useEffect(() => {
    if (type === "movie" || type === "tv") {
      setContentType(type);
    }
  }, [type, setContentType]);

  useDocumentTitle(`${details?.title || details?.name} | Netflix Clone`);

  if (isLoadingTrailer || isLoadingDetails) return <FullPageSpinner />;
  if (!trailerContent || !details) return <NotFoundPage />;

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />

        {trailerContent.results.length > 0 ? (
          <div className="flex justify-between items-center mb-4">
            <button
              className={`bg-gray-500/25 hover:bg-gray-800 text-white p-2 rounded-full ${currentTrailerIndex === 0 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
              disabled={currentTrailerIndex === 0}
              onClick={leftSliderHandler}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className={`bg-gray-500/25 hover:bg-gray-800 text-white p-2 rounded-full ${currentTrailerIndex === trailerContent.results.length - 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
              disabled={
                currentTrailerIndex === trailerContent.results.length - 1
              }
              onClick={rightSliderHandler}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        ) : (
          ""
        )}

        <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
          {trailerContent.results.length > 0 && !isLoadingTrailer ? (
            <ReactPlayer
              controls={true}
              width={"100%"}
              height={"70vh"}
              className="mx-auto overflow-hidden rounded-lg"
              src={`https://www.youtube.com/watch?v=${trailerContent.results[currentTrailerIndex].key}`}
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-10">
              <h1 className="text-center my-20 font-bold text-xl ">
                Sorry! No found trailer for this content
              </h1>
            </div>
          )}

          <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto mt-10">
            <div className="mb-4 md:mb-0 mt-20 flex flex-col gap-5">
              <h2 className="text-5xl font-bold text-balance mb-5">
                {details?.title || details?.name}
              </h2>

              <p className="mt-2 text-lg">
                {formatReleaseDate(
                  details?.release_date || details?.first_air_date,
                )}{" "}
                |{" "}
                {details?.adult ? (
                  <span className="text-red-600">18+</span>
                ) : (
                  <span className="text-green-600">PG-13</span>
                )}
              </p>
              <p className="mt-4 text-lg">{details?.overview}</p>
            </div>

            <img
              src={ORIGINAL_IMAGE_BASE_URL + details.poster_path}
              alt="Poster image"
              className="max-h-150 rounded-lg"
            />
          </div>
        </div>

        <ContentSlider mode="similar" id={id} mediaType={type} />
      </div>
    </div>
  );
}

export default WatchPage;
