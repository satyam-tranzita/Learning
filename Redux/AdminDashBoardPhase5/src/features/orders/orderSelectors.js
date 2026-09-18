import { createSelector } from "@reduxjs/toolkit";

import { orderAdapter } from "./orderSlice";

import { selectUsers } from "../users/userSelectors";
import { selectProducts } from "../products/productSelectors";

const orderSelectors = orderAdapter.getSelectors(
  state => state.orders
);

export const {
  selectAll: selectOrders,
  selectById: selectOrderById,
  selectIds: selectOrderIds,
  selectTotal: selectTotalOrders
} = orderSelectors;



// This allows:

// selectOrdersByUserId(state, 1)

// to return all orders of user 1.
export const selectOrdersByUserId = createSelector(
  [
    selectOrders,
    (_, userId) => userId
  ],

  (orders, userId) => {
    return orders.filter(
      order => order.userId === userId
    );
  }
);


export const selectProductsForOrder = createSelector(
  [
    (state, orderId) =>
      selectOrderById(state, orderId),

    selectProducts
  ],

  (order, products) => {
    if (!order) {
      return [];
    }

    return products.filter(product =>
      order.productIds.includes(product.id)
    );
  }
);