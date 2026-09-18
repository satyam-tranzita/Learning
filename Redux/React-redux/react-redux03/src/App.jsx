import Cart from "./components/Cart";
import ProductList from "./components/productList";


const App = () => {
  return (
    <div>
      <h2>Product List</h2>
      <ProductList />

      <h2>Cart</h2>
      <Cart />
    </div>
  );
};

export default App;