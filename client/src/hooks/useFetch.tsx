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
  
  const data2: Product[] = [
    {
      id: 1,
      img: "url",
      img2: "url",
      attributes: "asas",
      discription: "some text",
      title: "Product 1",
      isNew: true,
      oldPrice: 70,
      price: 50,
    },
    {
      id: 2,
      img: "url2",
      img2: "url2",
      attributes: "asas",
      discription: "some text",
      title: "Product 2",
      isNew: false,
      oldPrice: 80,
      price: 60,
    },
    {
      id: 3,
      img: "url3",
      img2: "url3",
      attributes: "asas",
      discription: "some text",
      title: "Product 3",
      isNew: true,
      oldPrice: 90,
      price: 70,
    },
    {
      id: 4,
      img: "url4",
      img2: "url44",
      attributes: "asas",
      discription: "some text",
      title: "Product 4",
      isNew: false,
      oldPrice: 100,
      price: 80,
    },
    {
      id: 5,
      img: "url5",
      img2: "url5",
      attributes: "asas",
      discription: "some text",
      title: "Product 5",
      isNew: true,
      oldPrice: 110,
      price: 90,
    },
  ];
  
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
