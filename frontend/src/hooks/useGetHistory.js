import { useEffect, useState } from "react";
import axios from "axios";

export const useGetHistory = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/v1/search/history`);

        setHistory(response.data.searchHistory);
      } catch (error) {
        console.error(`Failed to fetch users search history `, error);
      } finally {
        setIsLoading(false);
      }
    };

    getDetails();
  }, []);

  const removeFromHistory = (id = "") => {
    if (id !== "") {
      setHistory((prev) => prev.filter((entry) => entry.id !== id));
    } else {
      setHistory([]);
    }
  };

  return { history, removeFromHistory, isLoading };
};
