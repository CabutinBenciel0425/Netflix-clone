import { useParams } from "react-router-dom";
import { useGetPerson } from "../hooks/useGetPerson";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import Navbar from "../components/Navbar";
import { formatReleaseDate } from "../utils/formatReleaseDate";
import { ORIGINAL_IMAGE_BASE_URL } from "../utils/constants";

import FullPageSpinner from "../components/FullPageSpinner";
import ContentSlider from "../components/ContentSlider";

function ArtistsPage() {
  const { id } = useParams();
  const { details, isLoading } = useGetPerson(id);

  useDocumentTitle(`${details?.name} | Netflix Clone`);

  if (isLoading) return <FullPageSpinner />;

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-15 h-full">
        <Navbar />

        <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto mt-10">
          <div className="mb-4 md:mb-0 mt-20 flex flex-col gap-5">
            <h2 className="text-5xl font-bold text-balance mb-5">
              {details?.name}
            </h2>

            <p className="mt-2 text-xl font-semibold">
              {formatReleaseDate(details?.birthday)} | {details?.place_of_birth}
            </p>
            <p className="mt-4 text-md">{details?.biography}</p>
          </div>

          <img
            src={ORIGINAL_IMAGE_BASE_URL + details?.profile_path}
            alt="Poster image"
            className="max-h-150 rounded-lg"
          />
        </div>
      </div>

      <ContentSlider mode="person" id={id} mediaType="movie" title="Movies" />
      <ContentSlider mode="person" id={id} mediaType="tv" title="TV Shows" />
    </div>
  );
}

export default ArtistsPage;
