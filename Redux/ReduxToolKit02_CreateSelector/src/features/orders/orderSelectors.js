export const selectOrders = state =>
  state.orders.items;

export const selectTotalOrders = state =>
  state.orders.items.length;

export const selectPendingOrders = state =>
  state.orders.items.filter(
    order => order.status === "Pending"
  ).length;

export const selectDeliveredOrders = state =>
  state.orders.items.filter(
    order => order.status === "Delivered"
  ).length;

export const selectTotalRevenue = state =>
  state.orders.items.reduce(
    (total, order) => total + order.amount,
    0
  );