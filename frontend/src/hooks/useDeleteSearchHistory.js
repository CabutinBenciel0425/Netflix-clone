import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useDeleteSearchHistory = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteHistory = async (id) => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/v1/search/history/${id}`);
      toast.success("Searched history successfully deleted.");

      setIsDeleting(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete search history",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteHistory, isDeleting };
};
