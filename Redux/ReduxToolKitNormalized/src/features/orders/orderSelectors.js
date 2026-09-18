import { createSelector } from "@reduxjs/toolkit";
import { orderAdapter } from "./orderSlice";

const orderSelectors = orderAdapter.getSelectors(
  state => state.orders
);

export const {
  selectAll: selectOrders,
  selectById: selectOrderById,
  selectIds: selectOrderIds,
  selectTotal: selectTotalOrders
} = orderSelectors;

export const selectPendingOrders = createSelector(
  [selectOrders],

  orders =>
    orders.filter(
      order => order.status === "Pending"
    )
);

export const selectDeliveredOrders = createSelector(
  [selectOrders],

  orders =>
    orders.filter(
      order => order.status === "Delivered"
    )
);

export const selectTotalRevenue = createSelector(
  [selectOrders],

  orders =>
    orders.reduce(
      (total, order) => total + order.amount,
      0
    )
);