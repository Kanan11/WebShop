import { useEffect, useState } from "react";

const useFetch = <T extends any>(url: string) => {
  console.log(url)
  const [data, setData] = useState<Product[]>([]); // product list
  const [loading, setLoading] = useState<boolean>(false); // loading boolean
  const [error, setError] = useState<Error | null>(null); // error handler
  
  
  interface Product {
    id: string | number;
    img: string;
    img2: string;
    attributes: any;
    discription: string;
    title: string;
    isNew?: boolean;
    oldPrice?: number;
    price?: number;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json() as Product[];
        setData(json);
      } catch (error: any) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error("Unknown error occurred"));
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
