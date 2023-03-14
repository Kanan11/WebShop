import React from "react";
import { useState } from "react";
import "./Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";

interface Product {
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
/* 
const Product: React.FC<Product> = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImg, setSelectedImg] = useState<string>("img");
  const [quantity, setQuantity] = useState<number>(1);

  const dispatch = useDispatch();
  const { data, loading, error } = useFetch<Product>(`/products/${id}?populate=*`);
  const item = data
  console.log(item)
  return (
    <div className="product">
      {loading ? (
        "loading"
      ) : (
        <>
          <div className="left">
            <div className="images">
              <img
                src={
                  process.env.REACT_APP_UPLOAD_URL +
                  item.img
                }
                alt=""
                onClick={(e) => setSelectedImg("img")}
              />
              <img
                src={
                  process.env.REACT_APP_UPLOAD_URL +
                  item?.img2
                }
                alt=""
                onClick={(e) => setSelectedImg("img2")}
              />
            </div>
            <div className="mainImg">
              <img
                src={
                  selectedImg
                }
                alt=""
              />
            </div>
          </div>
          <div className="right">
            <h1>{item.title}</h1>
            <span className="price">{item.price}SEK</span>
            <p>{item.description}</p>
            <div className="quantity">
              <button
                onClick={() =>
                  setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                }
              >
                -
              </button>
              {quantity}
              <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
            </div>
            <button
              className="add"
              onClick={() =>
                dispatch(
                  addToCart({
                    id: Number(item.id),
                    title: item.title,
                    desc: item.description || '',
                    price: item.price,
                    img: item.img || '',
                    quantity,
                  })
                )
              }
            >
              <AddShoppingCartIcon /> ADD TO CART
            </button>
            <div className="links">
              <div className="item">
                <FavoriteBorderIcon /> ADD TO WISH LIST
              </div>
              <div className="item">
                <BalanceIcon /> ADD TO COMPARE
              </div>
            </div>
            <div className="info">
              <span>Vendor: Polo</span>
              <span>Product Type: T-Shirt</span>
              <span>Tag: T-Shirt, Women, Top</span>
            </div>
            <hr />
            <div className="info">
              <span>DESCRIPTION</span>
              <hr />
              <span>ADDITIONAL INFORMATION</span>
              <hr />
              <span>FAQ</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Product; */