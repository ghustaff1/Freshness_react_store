import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './slices/cartSlice';
import categoriesReducer from "./slices/categoriesSlice";
import farmsReducer from "./slices/farmsSlice";
import localizReducer from "./slices/localizSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoriesReducer,
    farms: farmsReducer,
    localiz:localizReducer
  },
});