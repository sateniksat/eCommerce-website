import { useEffect, useState } from "react";
import { api } from "../api/api";

const delay = () => {
  return new Promise((resolve) => setTimeout(() => resolve("delay"), 3000));
};

const useFetch = (url, config = {},refresh) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await api.get(url, config).then(res=>res);
        await delay();
        // console.log(response)
        setData(response);
      } catch (error) {
        setError(error);
      }
       finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, [url,refresh]);// eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error };
};

export { useFetch };
