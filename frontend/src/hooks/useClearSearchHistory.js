import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useClearSearchHistory = () => {
  const [isClearing, setIsClearing] = useState(false);

  const clearHistory = async () => {
    try {
      setIsClearing(true);
      await axios.delete(`/api/v1/search/history`);
      toast.success("Searched history successfully cleared.");

      setIsClearing(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete search history",
      );
    } finally {
      setIsClearing(false);
    }
  };

  return { clearHistory, isClearing };
};
