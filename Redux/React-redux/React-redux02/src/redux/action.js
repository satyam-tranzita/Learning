export const addItem = (product) => ({
  type: "cart/addItem",
  payload: product
});

export const removeItem = (productId) => ({
  type: "cart/removeItem",
  payload: productId
});

export const increaseQuantity = (productId) => ({
  type: "cart/increaseQuantity",
  payload: productId
});

export const decreaseQuantity = (productId) => ({
  type: "cart/decreaseQuantity",
  payload: productId
});

export const clearCart = () => ({
  type: "cart/clearCart"
});