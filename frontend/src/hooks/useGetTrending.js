import { useEffect, useState } from "react";
import axios from "axios";
import { useContentStore } from "../store/content";

export const useGetTrending = () => {
  const [trendingContent, setTrendingContent] = useState(null);
  const { contentType } = useContentStore();

  useEffect(() => {
    const getTrendingContent = async () => {
      const response = await axios.get(
        `/api/v1/content/${contentType}/trending`,
      );

      setTrendingContent(response.data.trendingContent);
    };
    getTrendingContent();
  }, [contentType]);

  return { trendingContent };
};
