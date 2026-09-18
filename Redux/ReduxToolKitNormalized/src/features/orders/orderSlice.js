import {
  createSlice,
  createEntityAdapter
} from "@reduxjs/toolkit";

const orderAdapter = createEntityAdapter();

const initialState = orderAdapter.getInitialState();

const orderSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {
    addOrder: orderAdapter.addOne,

    addOrders: orderAdapter.addMany,

    deleteOrder: orderAdapter.removeOne,

    updateOrder: orderAdapter.updateOne,

    setOrders: orderAdapter.setAll,

    clearOrders: orderAdapter.removeAll
  }
});

export const {
  addOrder,
  addOrders,
  deleteOrder,
  updateOrder,
  setOrders,
  clearOrders
} = orderSlice.actions;

export default orderSlice.reducer;

export { orderAdapter };