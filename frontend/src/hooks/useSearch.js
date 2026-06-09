import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useSearch = (activeTab, submittedQuery) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!submittedQuery) {
      setResults([]);
      return;
    }

    const getSearch = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `/api/v1/search/${activeTab}/${submittedQuery}`,
        );
        setResults(response.data.data.results || []);
      } catch (error) {
        if (error.response?.status === 404) {
          setResults([]);
          toast.error(
            "Nothing found, make sure you are searching under the right category",
          );
        } else {
          toast.error("An error occurred, please try again later");
        }
      } finally {
        setIsLoading(false);
      }
    };

    getSearch();
  }, [activeTab, submittedQuery]);

  return { results, isLoading };
};
