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
  item?: {
    id: string | number;
    price: number;
    isNew: boolean;
    title?: string;
    description?: string | undefined;
    img?: string;
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

  const Product: React.FC<Product> = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImg, setSelectedImg] = useState<string>("img");
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useDispatch();
  const { data, loading, error } = useFetch(`http://localhost:1337/api/products/${id}?populate=*`);
  
  return (
    <div className="product">
      {loading ? (
        "loading"
      ) : (
        <>
          <div>
          {Array.isArray(data) ? (
            data.map(product => (
              <div key={typeof product.id === "string" ? parseInt(product.id) : product.id} className="left">
                <div className="images">
                  <img
                    src={
                    `http://localhost:1337${product.attributes.img.data.attributes.url}`
                    }
                    alt=""
                    onClick={(e) => setSelectedImg("img")}
                  />
                  <img
                    src={
                      `http://localhost:1337${product.attributes.img2.data.attributes.url}`
                    }
                    alt=""
                    onClick={(e) => setSelectedImg("img2")}
                  />
                </div>
                <div className="mainImg">
                  <img
                    src={
                      `http://localhost:1337${product.attributes[selectedImg].data.attributes.url}`
                    }
                    alt=""
                  />
                </div>
              </div>
                ))              
              ) : (
                <p>Loading...</p>
              )}
            </div>
          <div >
            {Array.isArray(data) ? (
              data.map(product => (
                <div key={typeof product.id === "string" ? parseInt(product.id) : product.id} className="right">
                  <h2>{product.attributes.title}</h2>
                  <p>{product.attributes.desc}</p>
                  <span className="price">{product.attributes.price} SEK</span>
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
                  <pre style={{ color: 'red' }}>Categories - {product.attributes.categories.data.map((item: { attributes: any; }) => item.attributes.title)}</pre>
                  <pre style={{ color: 'red' }}>Sub Categories - {product.attributes.sub_categories.data.map((item: { attributes: any; }) => item.attributes.title)}</pre>
                  <button
                    className="add"
                    onClick={() =>
                      dispatch(
                        addToCart({
                          id: product.id,
                          title: product.attributes.title,
                          desc: product.attributes.desc || '',
                          price: product.attributes.price,
                          img: `http://localhost:1337${product.attributes.img.data.attributes.url}` || '',
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
                    ))              
                  ) : (
                    <p>Loading...</p>
                  )}
          </div>
        </>
      )}
    </div>
  );
};

export default Product;