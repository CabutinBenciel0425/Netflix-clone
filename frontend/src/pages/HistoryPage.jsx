import { Trash } from "lucide-react";
import Navbar from "../components/Navbar";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useGetHistory } from "../hooks/useGetHistory";
import { SMALL_IMAGE_BASE_URL } from "../utils/constants";
import { formatReleaseDate } from "../utils/formatReleaseDate";
import { useDeleteSearchHistory } from "../hooks/useDeleteSearchHistory";
import Button from "../components/Button";
import { useClearSearchHistory } from "../hooks/useClearSearchHistory";

function HistoryPage() {
  useDocumentTitle(`Search History | Netflix Clone`);
  const { history, removeFromHistory } = useGetHistory();
  const { deleteHistory } = useDeleteSearchHistory();
  const { clearHistory } = useClearSearchHistory();

  const handleDelete = async (id) => {
    await deleteHistory(id);
    removeFromHistory(id);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 ">Search History</h1>

        {history.length !== 0 && (
          <div className="w-full flex items-center justify-end py-5">
            <Button
              from="history"
              onClick={() => {
                clearHistory();
                removeFromHistory();
              }}
            >
              Clear History <Trash size={14} className="mt-0.5" />
            </Button>
          </div>
        )}

        {history.length === 0 && (
          <div className="flex justify-center items-center h-96">
            <p className="text-center font-semibold text-xl">
              No searched history found
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {history?.map((entry) => (
            <div
              className="bg-gray-800 p-4 rounded flex items-start"
              key={entry.id}
            >
              <img
                src={SMALL_IMAGE_BASE_URL + entry.image}
                alt="History image"
                className="size-16 rounded-full object-cover mr-4"
              />

              <div className="flex flex-col">
                <span className="text-white text-lg">{entry.title}</span>
                <span className="text-gray-400 text-sm">
                  {formatReleaseDate(entry.createdAt)}
                </span>
              </div>

              <span
                className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto ${entry.searchType === "movie" ? "bg-red-600" : entry.searchType === "tv" ? "bg-blue-600" : "bg-green-600"}`}
              >
                {entry.searchType === "tv"
                  ? "TV Show"
                  : entry.searchType.at(0).toUpperCase() +
                    entry.searchType.slice(1)}
              </span>

              <Trash
                className="size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600"
                onClick={() => handleDelete(entry.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;
