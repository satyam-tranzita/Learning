export const selectProducts = state =>
  state.products.items;

export const selectTotalProducts = state =>
  state.products.items.length;

export const selectProductsInStock = state =>
  state.products.items.filter(
    product => product.stock > 0
  ).length;