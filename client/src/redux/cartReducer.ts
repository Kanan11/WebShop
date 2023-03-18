import { createSlice } from "@reduxjs/toolkit";

export interface CartState {
  cart: any;
  products: CartItem[];
}

export type CartItem = {
  attributes: any;
  id: number;
  title: string;
  desc: string;
  price: number;
  img: string;
  quantity: number;
};


const initialState: CartState = {
  products: [],
  cart: null
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // console.log(state.products)
      // console.log(action.payload)
      const item = state.products.find((item) => item.id === action.payload.id);
      // console.log(item)
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    removeItem: (state,action) => {
      state.products=state.products.filter(item=>item.id !== action.payload)
    },
    resetCart: (state) => {
      state.products = []
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart,removeItem,resetCart } = cartSlice.actions;

export default cartSlice.reducer;
