import { useEffect, useState } from "react";
import axios from "axios";

export const useGetContentsByCategory = (contentType, category) => {
  const [contents, setContents] = useState(null);

  useEffect(() => {
    if (!contentType || !category) return;

    const getContent = async () => {
      try {
        const res = await axios.get(
          `/api/v1/content/${contentType}/${category}`,
        );

        setContents(res.data.categoryList);
      } catch (error) {
        console.error("Failed to fetch content category", error);
      }
    };

    getContent();
  }, [contentType, category]);

  return { contents };
};
