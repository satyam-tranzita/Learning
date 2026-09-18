import { useDispatch } from "react-redux";

import { products } from "../data/Products.js"
import { addItem } from "../features/CartSlice"

function ProductList() {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Products</h2>

      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>

          <p>₹{product.price}</p>

          <button
            onClick={() => dispatch(addItem(product))}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;