import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

export const useGetDetails = (id, mediaType = "") => {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { contentType } = useContentStore();
  const type = mediaType ? mediaType : contentType;

  useEffect(() => {
    if (!id || !type) return;

    const getDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `/api/v1/content/${type}/${id}/details`,
        );

        setDetails(response.data.details);
      } catch (error) {
        console.error(`Failed to fetch details for ${type} content`, error);
      } finally {
        setIsLoading(false);
      }
    };

    getDetails();
  }, [type, id]);

  return { details, isLoading };
};
