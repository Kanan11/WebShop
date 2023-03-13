import React from "react";
import "./Card.scss";
import { Link } from "react-router-dom";

interface CardProps {
    item: {
      id: string | number;
      price: number;
      isNew: boolean;
      title: string;
      description?: string | undefined;
      img: string;
      img2: string;
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
    };
  }

  const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <Link className="link" to={`/product/${item.id}`}>
      <div className="card">
        <div className="image">
          {item?.isNew && <span>New Season</span>}
          <img
            src={
              (item.img)
            }
            alt=""
            className="mainImg"
          />
          <img
        /*    src={
              process.env.REACT_APP_UPLOAD_URL +
              (item?.attributes.img2?.data?.attributes?.url ?? "")
            } */
            src={
              (item.img2)
            }
            alt=""
            className="secondImg"
          />
        </div>
        <h2>{item?.title}</h2>
        <div className="prices">
          <h3>{item?.oldPrice ?? (item?.price ?? 0) + 20}SEK</h3>
          <h3>{item?.price}SEK</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;
