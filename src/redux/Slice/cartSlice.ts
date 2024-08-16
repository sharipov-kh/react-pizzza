import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItemType = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  type: string;
  size: number;
  count: number;
};

interface cartSliceState {
  totalPrice: number;
  items: CartItemType[];
}

const initialState: cartSliceState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((acc, obj) => {
        return obj.price * obj.count + acc;
      }, 0);
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },

    clearItem(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    onPlus(state, action: PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count++;
        state.totalPrice = state.items.reduce(
          (acc, res) => res.price * res.count + acc,
          0
        );
      }
    },

    onMinus(state, action: PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        if (findItem.count === 1) {
          if (window.confirm("Ты действительно хочешь удалить товар?")) {
            state.items = state.items.filter(
              (obj) => obj.id !== action.payload
            );
          }
        } else {
          state.totalPrice = state.items.reduce(
            (acc, res) => res.price * res.count - acc,
            state.totalPrice
          );
          findItem.count--;
        }
      }
    },
  },
});

export const { addItem, removeItem, clearItem, onPlus, onMinus } =
  cartSlice.actions;

export default cartSlice.reducer;
