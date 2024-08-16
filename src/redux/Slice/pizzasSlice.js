import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzas",
  async (params) => {
    const { categoryBy, search, order, category, currentPage } = params;

    const { data } = await axios(
      `https://66ade952b18f3614e3b63450.mockapi.io/pizzas?page=${currentPage}&limit=4&${categoryBy}&sortBy=${order}&order=${category}${search}`
    );

    return data;
  }
);

const initialState= {
  items: [],
  status: "loading",
};

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "failed";
        state.items = [];
      });
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
