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

const useFetch = (url: string, token?: string | undefined) => {
  const [data, setData] = useState<Product[]>([]); // product list
  const [loading, setLoading] = useState<boolean>(false); // loading boolean
  const [error, setError] = useState<boolean>(false); // error handler
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, {
          headers: {
            Authorization: token ? `Bearer ${token}` : ''
          }
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        // setData(Array.isArray(json.data) ? json.data : [json.data]);
        // console.log(json.data)
        if (json.data === undefined) {
          setData(json);
        } else {
          setData(Array.isArray(json.data) ? json.data : [json.data]);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(true);
          console.log('error: ', error);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [url, token]);
  

  return { data, loading, error };
};

export default useFetch;
