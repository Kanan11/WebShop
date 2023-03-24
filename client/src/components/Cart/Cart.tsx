import React, { useEffect, useState } from "react";
import "./Cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useSelector } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import { useDispatch } from "react-redux";
import { CartState, CartItem } from '../../redux/cartReducer';

interface Cart {
  setOpen?: (value: boolean) => void;
}

function Cart({ setOpen }: Cart) {
  const products = useSelector<CartState, CartItem[]>(state => {
    return state.cart.products;
  });
  const dispatch = useDispatch();
  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  };

  const handlePayment = async () => {

    try {
      const requestBody = {
        userName: ['John', 'Silver'].join(" "),
        email: 'demo@mail.com',
        shippingAddress: {
          line1: 'street',
          city: 'city',
          postal_code: 'zip',
          country: 'country'
        },
        products: products.map(({ id, quantity }) => ({
          id,
          quantity,
        })),
        shipping_options: {
          name: 'Standard',
          price: 99,
          estimated_delivery_date: '3-5 business days'
        }
      }
            const response = await fetch('http://localhost:1337/api/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          });
          const data = await response.json();
          console.log('data----', data.url)
          dispatch(resetCart())
          if (response.status === 200) window.location = data.url
          
          
          /* TODO if paid update status at Strapi DB */
    } catch (error) {
      if (error instanceof Error) {
        console.log('error: ', error);
      }
    }
  }

  function handleClose() {
    // if (setOpen) setOpen(false)
    setOpen && setOpen(false)
  }

  
  return (
    <div className="cart">
      <h1>Products in your cart</h1>
      {products?.map((item) => (
        <div className="item" key={item.id}>
          <img src={item.img} alt="" />
          <div className="details">
            <h1>{item.title}</h1>
            <p>{item.desc?.substring(0, 50)}...</p>
            <div className="price">
              {item.quantity} x {item.price}SEK
            </div>
          </div>
          <DeleteOutlinedIcon
            className="delete"
            onClick={() => dispatch(removeItem(item.id))}
          />
        </div>
      ))}
      <div className="total">
        <span>SUBTOTAL</span>
        <span>{totalPrice()}SEK</span>
      </div>
      <button onClick={handlePayment} >PROCEED TO CHECKOUT</button>
      <span className="reset" onClick={() => {handleClose(); dispatch(resetCart());}}>
        Reset Cart
      </span>
    </div>
  );
};

export default Cart;
