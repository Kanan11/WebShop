import { useEffect, useState } from "react";

interface FetchData {
  loading: boolean;
  error: Error | null | unknown;
  data: any;
}

const useFetch = (url: string): FetchData => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null | unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url);
        const json = await res.json();

        setData(json);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { loading, error, data };
};

export default useFetch;
