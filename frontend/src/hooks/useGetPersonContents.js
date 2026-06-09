import { useEffect, useState } from "react";
import axios from "axios";

export const useGetPersonContents = (id, contentType) => {
  const [contents, setContents] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id || !contentType) return;
    const getPersonContents = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `/api/v1/search/person/${id}/${contentType}`,
        );
        setContents({ results: response.data.credits.cast });
      } catch (error) {
        console.error(`Failed to fetch artist ${contentType} contents`, error);
      } finally {
        setIsLoading(false);
      }
    };

    getPersonContents();
  }, [id, contentType]);

  return { contents, isLoading };
};
