import { useEffect, useState } from "react";
import { apiPath } from "../../secret";

export default function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchFromApi() {
      setLoading(true);
      try {
        const apiResponse = await fetch(`${apiPath}${url}`, options);

        if (!apiResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await apiResponse.json();

        setData(result);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchFromApi();
  }, [url]);

  return { data, loading };
}