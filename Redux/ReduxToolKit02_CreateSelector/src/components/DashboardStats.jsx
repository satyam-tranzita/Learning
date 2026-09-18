import { useSelector } from "react-redux";

import {
  selectTotalUsers,
  selectActiveUsers
} from "../features/users/userSelector"

import {
  selectTotalProducts,
  selectProductsInStock
} from "../features/products/ProductSelectors"

import {
  selectTotalOrders,
  selectPendingOrders,
  selectDeliveredOrders,
  selectTotalRevenue
} from "../features/orders/orderSelectors";

function DashboardStats() {
  const totalUsers = useSelector(selectTotalUsers);
  const activeUsers = useSelector(selectActiveUsers);

  const totalProducts =
    useSelector(selectTotalProducts);

  const productsInStock =
    useSelector(selectProductsInStock);

  const totalOrders =
    useSelector(selectTotalOrders);

  const pendingOrders =
    useSelector(selectPendingOrders);

  const deliveredOrders =
    useSelector(selectDeliveredOrders);

  const totalRevenue =
    useSelector(selectTotalRevenue);

  return (
    <div>
      <h2>Dashboard Statistics</h2>

      <h3>Users</h3>
      <p>Total: {totalUsers}</p>
      <p>Active: {activeUsers}</p>

      <h3>Products</h3>
      <p>Total: {totalProducts}</p>
      <p>In Stock: {productsInStock}</p>

      <h3>Orders</h3>
      <p>Total: {totalOrders}</p>
      <p>Pending: {pendingOrders}</p>
      <p>Delivered: {deliveredOrders}</p>

      <h3>Revenue</h3>
      <p>₹{totalRevenue}</p>
    </div>
  );
}

export default DashboardStats;