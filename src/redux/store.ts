import { configureStore } from "@reduxjs/toolkit";
import FilterSlice from "./Slice/FilterSlice";
import cart from "./Slice/cartSlice";
import pizzas from "./Slice/pizzasSlice";

const store = configureStore({
  reducer: {
    filter: FilterSlice,
    cart,
    pizzas,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
