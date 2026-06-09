import { useEffect, useState } from "react";
import axios from "axios";
import { useContentStore } from "../store/content";

export const useGetSimilarContents = (id, mediaType = "") => {
  const [similarContents, setSimilarContents] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { contentType } = useContentStore();
  const type = mediaType ? mediaType : contentType;

  useEffect(() => {
    if (!id || !type) return;

    const getContent = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/v1/content/${type}/${id}/similar`);

        setSimilarContents(res.data.similarContent);
      } catch (error) {
        console.error(`Failed to fetch similar ${type} content`, error);
      } finally {
        setIsLoading(false);
      }
    };

    getContent();
  }, [id, type]);

  return { similarContents, isLoading };
};
