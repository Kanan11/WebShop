import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./FeaturedProducts.scss";
import { Product } from '../../types/types'
// import useFetch from "../../hooks/useFetch";

interface FeaturedProductsProps {
  type: string;
}

interface Product2 {
  id: string | number;
  attributes: {
    isNew?: boolean;
    img?: {
      data?: {
        attributes?: {
          url?: string;
        };
      };
    };
    img2?: {
      data?: {
        attributes?: {
          url?: string;
        };
      };
    };
    title?: string;
    price?: number;
  };
  oldPrice?: number;
}


const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ type }) => {
  // const { loading, error, data } = useFetch(`http://localhost:1337/api/products`);
  const [data, setData] = useState<Product[]>([])
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect (() => {
    const fetchData = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_API_URL ?? 'http://localhost:1337/api/products', {
          headers: {
            Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN
          },
        })
        const json = await res.json()
        setData(json);
        // console.log('api -> json', json)
      } catch (error) {
        console.log(error)
        setData([]);
      }
    }
    fetchData();
  }, [])
  console.log('data ->', data)
  
  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type} products</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices
          gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis labore et
          dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo
          viverra maecenas.
        </p>
      </div>
      <div className="bottom"> 
      {!error ? (
          <p>Something went wrong!</p>
        ) : loading ? (
          <p>Loading...</p>
        ) : /* (
          data.map((item) => <Card item={item} key={item.id?.toString()} />)
        ) */''}
      </div>
    </div>
  );
};

export default FeaturedProducts;
