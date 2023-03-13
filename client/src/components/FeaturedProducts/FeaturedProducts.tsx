import React from "react";
import Card from "../Card/Card";
import "./FeaturedProducts.scss";
import useFetch from "../../hooks/useFetch";

interface FeaturedProductsProps {
  type: string;
}

interface Product {
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
  const { loading, error, data } = useFetch(`/products?populate=*&[filters][type][$eq]=${type}`);
    console.log(data)
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
        {error
          ? "Something went wrong!"
          : loading
          ? "loading"
          : data?.map((item: Product) => (
              <Card item={item} key={item.id.toString()} />
            ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
