import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SortType = {
  name: string;
  sort: "rating" | "price" | "name" | "-rating" | "-price" | "-name";
};

interface FilterSliceState {
  categoryId: number;
  currentPage: number;
  sortType: SortType;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  currentPage: 1,
  sortType: {
    name: "популярности",
    sort: "rating",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<SortType>) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.sortType = action.payload.sortType;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const { setCategoryId, setSortType, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
