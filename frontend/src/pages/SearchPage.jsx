import { useState } from "react";
import { Search } from "lucide-react";
import { useSearch } from "../hooks/useSearch";
import { Link } from "react-router-dom";
import { ORIGINAL_IMAGE_BASE_URL } from "../utils/constants";
import axios from "axios";

import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Input from "../components/Input";

function SearchPage() {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const { results, isLoading } = useSearch(activeTab, submittedQuery);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setSearchTerm("");
    setSubmittedQuery("");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setSubmittedQuery(searchTerm);
    try {
      await axios.post("/api/v1/search/history", {
        query: searchTerm,
        type: activeTab,
      });
    } catch (error) {
      console.error("Failed to save search history", error);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-3 mb-4">
          <Button
            from="search"
            division="movie"
            activeTab={activeTab}
            onClick={() => handleTabSwitch("movie")}
          >
            Movies
          </Button>
          <Button
            from="search"
            division="tv"
            activeTab={activeTab}
            onClick={() => handleTabSwitch("tv")}
          >
            TV Shows
          </Button>
          <Button
            from="search"
            division="person"
            activeTab={activeTab}
            onClick={() => handleTabSwitch("person")}
          >
            Person
          </Button>
        </div>

        <form
          className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto"
          onSubmit={handleSearch}
        >
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search for a ${activeTab}`}
            from="search"
          />
          <Button type="submit" from="searchbar">
            <Search className="size-6" />
          </Button>
        </form>

        {isLoading && <p className="text-center text-gray-400">Loading...</p>}

        {!isLoading && submittedQuery && results.length === 0 && (
          <p className="text-center text-xl mt-20">
            No results found for "{submittedQuery}"
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((result) => {
            if (!result.poster_path && !result.profile_path) return null;
            return (
              <div className="bg-gray-800 p-4 rounded" key={result.id}>
                {activeTab === "person" ? (
                  <Link
                    to={"/artist/" + result.id}
                    className="flex flex-col items-center"
                  >
                    <img
                      src={ORIGINAL_IMAGE_BASE_URL + result.profile_path}
                      alt={result.name}
                      className="max-h-96 rounded mx-auto"
                    />
                    <h2 className="mt-2 text-xl font-bold">{result.name}</h2>
                  </Link>
                ) : (
                  <Link to={"/watch/" + activeTab + "/" + result.id}>
                    <img
                      src={ORIGINAL_IMAGE_BASE_URL + result.poster_path}
                      alt={result.name || result.title}
                      className="w-full h-auto rounded"
                    />
                    <h2 className="mt-2 text-xl font-bold">
                      {result.name || result.title}
                    </h2>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
