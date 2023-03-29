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

  function handleChekout () {
    window.location.href = '/checkout';
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
      <button onClick={handleChekout} >PROCEED TO CHECKOUT</button>
      <span className="reset" onClick={() => {handleClose(); dispatch(resetCart());}}>
        Reset Cart
      </span>
    </div>
  );
};

export default Cart;
