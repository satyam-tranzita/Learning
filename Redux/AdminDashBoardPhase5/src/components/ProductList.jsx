import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  addProduct,
  deleteProduct
} from "../features/products/productSlice";

import {
  selectProducts
} from "../features/products/productSelectors";

function ProductList() {
  const dispatch = useDispatch();

  const products = useSelector(
    selectProducts
  );

  const handleAddProduct = () => {
    const product = {
      id: Date.now(),

      name: "Laptop",

      price: 60000,

      stock: 10
    };

    dispatch(addProduct(product));
  };

  return (
    <div>
      <h2>Products</h2>

      <button onClick={handleAddProduct}>
        Add Product
      </button>

      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>

          <p>
            Price: ₹{product.price}
          </p>

          <p>
            Stock: {product.stock}
          </p>

          <button
            onClick={() =>
              dispatch(
                deleteProduct(product.id)
              )
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;