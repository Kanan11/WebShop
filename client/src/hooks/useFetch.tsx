import { useEffect, useState } from "react";

interface Product {
  id: string | number;
  img: string;
  img2: string;
  attributes: any;
  description: string;
  title: string;
  isNew?: boolean;
  oldPrice?: number;
  price?: number;
  [key: string]: any;
}

interface ApiResponse {
  data: Product[];
  meta: any;
}

const useFetch = (url: string) => {
  const [data, setData] = useState<Product[]>([]); // product list
  const [loading, setLoading] = useState<boolean>(false); // loading boolean
  const [error, setError] = useState<boolean>(false); // error handler

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, {
          headers: {
            Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json() as ApiResponse;
        setData(Array.isArray(json.data) ? json.data : [json.data]);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
