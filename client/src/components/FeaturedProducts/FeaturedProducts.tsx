import React from "react";
import Card from "../Card/Card";
import "./FeaturedProducts.scss";
// import { Product } from '../../types/types'
// import {ApiProductProduct} from "../../types/types"
import useFetch from "../../hooks/useFetch";
// import { CardProps } from '../../types/types'

interface FeaturedProductsProps {
  type: string;
}

// interface Product2 {
//   id: string | number;
//   attributes: {
//     isNew?: boolean;
//     img?: {
//       data?: {
//         attributes?: {
//           url?: string;
//         };
//       };
//     };
//     img2?: {
//       data?: {
//         attributes?: {
//           url?: string;
//         };
//       };
//     };
//     title?: string;
//     price?: number;
//   };
//   oldPrice?: number;
// }


const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ type }) => {
  // const { loading, error, data } = useFetch(`http://localhost:1337/api/products`);
  // const [data, setData] = useState<Product[]>([])
  // const [error, setError] = useState<Error | null>(null);
  // const [loading, setLoading] = useState(false);
  // useEffect (() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true)
  //       const res = await fetch(process.env.REACT_APP_API_URL ?? + `?populate=*` + 'http://localhost:1337/api/products', {
  //         headers: {
  //           Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN
  //         },
  //       })
  //       const json = await res.json()
  //       setData(json);
  //       // console.log('api -> json', json)
  //     } catch (error: any) {
  //       if (error instanceof Error) {
  //         setError(error);
  //       } else {
  //         setError(new Error("Unknown error occurred"));
  //       }
  //     }
  //     setLoading(false)
  //   }
  //   fetchData();
  // }, [])
  // console.log('data ->', data)
  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_API_URL}?populate=*&[filters][type][$eq]=featured/api/products?populate=*&[filters][type][$eq]=${type}`
    );
  
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
      {error ? (
        <p>Something went wrong!</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : data.length > 0 ? (
        data.map((item) => <Card
          item={{
            ...item,
            id: typeof item.id === "string" ? parseInt(item.id) : item.id,
          }}
          key={item.id?.toString()}
        />)
      ) : (
        <p>No data available.</p>
      )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
