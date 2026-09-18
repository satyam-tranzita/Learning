import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/users/userSlice";
import productReducer from "../features/products/productSlice";
import orderReducer from "../features/orders/orderSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    products: productReducer,
    orders: orderReducer
  }
});