import React from "react";
import "./Card.scss";
import { Link } from "react-router-dom";
import { CardProps } from '../../types/types'

// moved to external types
interface CardProps3 {
  item: {
    id: string | number;
    oldPrice?: number;
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
  };
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  const {item} = props
  console.log(item);
  return (
    <Link className="link" to={`/product/${item.id}`}>
      <div className="card">
        <div className="image">
          {item?.attributes?.isNew && <span>New Season</span>}
          <img
            src={
              'url'
            }
            alt=""
            className="mainImg"
          />
          <img
            src={
              'url'
            }
            alt=""
            className="secondImg"
          />
        </div>
        <h2>{item.attributes?.title}</h2>
        <div className="prices">
          <h3>{item.oldPrice}SEK</h3>
          <h3>{item.attributes?.price}SEK</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;
