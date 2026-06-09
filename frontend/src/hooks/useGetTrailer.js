import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

export const useGetTrailer = (id, mediaType = "") => {
  const [trailerContent, setTrailerContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { contentType } = useContentStore();

  let type = mediaType ? mediaType : contentType;

  useEffect(() => {
    const getTrailerContent = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `/api/v1/content/${type}/${id}/trailer`,
        );

        setTrailerContent(response.data.trailers);
      } catch (error) {
        console.error(`Failed to fetch trailer ${type} content`, error);
      } finally {
        setIsLoading(false);
      }
    };
    getTrailerContent();
  }, [type, id]);

  return { trailerContent, isLoading };
};
