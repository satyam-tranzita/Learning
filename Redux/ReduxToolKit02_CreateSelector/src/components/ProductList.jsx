import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../features/products/productSlice";

const ProductList = () => {
    const dispatch =useDispatch();
    const products=useSelector(state=>state.products.items);

    const handleAddProduct=()=>{
        const product={
            id:Date.now(),
            title:"Laptop",
            price:100
        }
        dispatch(addProduct(product))
    }
    
  return (
 <div>
      <h2>All Products </h2>
      <button onClick={handleAddProduct}>
        AddProduct
      </button>
      {products.map(product=>(
        <div key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.price}</p>
            </div>
      ))}
    </div>
  );
};

export default ProductList;