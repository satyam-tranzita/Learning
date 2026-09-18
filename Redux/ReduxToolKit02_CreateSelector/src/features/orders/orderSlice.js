import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: []
};

const orderSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {
    addOrder(state, action) {
      state.items.push(action.payload);
    },

    updateOrderStatus(state, action) {
      const order = state.items.find(
        order => order.id === action.payload.id
      );

      if (order) {
        order.status = action.payload.status;
      }
    }
  }
});

export const {
  addOrder,
  updateOrderStatus
} = orderSlice.actions;

export default orderSlice.reducer;