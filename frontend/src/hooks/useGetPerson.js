import { useEffect, useState } from "react";
import axios from "axios";

export const useGetPerson = (id) => {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/v1/search/person/${id}/details`);
        setDetails(response.data.personDetails);
      } catch (error) {
        console.error(`Failed to fetch artist details`, error);
      } finally {
        setIsLoading(false);
      }
    };

    getDetails();
  }, [id]);

  return { details, isLoading };
};
