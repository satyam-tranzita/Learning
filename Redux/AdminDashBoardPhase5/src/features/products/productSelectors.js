import { createSelector } from "@reduxjs/toolkit";

import { productAdapter } from "./productSlice";


const productSelectors = productAdapter.getSelectors(
  state => state.products
);

export const {
  selectAll: selectProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
  selectTotal: selectTotalProducts
} = productSelectors;

export const selectProductsInStock = createSelector(
  [selectProducts],

  products =>
    products.filter(product => product.stock > 0)
);