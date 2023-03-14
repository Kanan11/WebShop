import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  products: CartItem[];
}

interface CartItem2 {
  id: number;
  title: string;
  desc: string | undefined;
  price: number;
  img: string;
  quantity: number;
}

type CartItem = {
  id: number;
  title: string;
  desc: string;
  price: number;
  img: string;
  quantity: number;
};


const initialState: CartState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ id: number; title: string; desc: string; price: number; img: string; quantity: number }>) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },    
    removeItem: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((item) => item.id !== action.payload);
    },
    resetCart: (state) => {
      state.products = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { removeItem, resetCart } = cartSlice.actions;

export const addToCart = (payload: CartItem) => ({
  type: addToCart,
  payload,
});

export default cartSlice.reducer;
