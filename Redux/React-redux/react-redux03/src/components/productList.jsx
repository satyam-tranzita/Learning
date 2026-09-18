import { useState } from "react";
import { useDispatch} from "react-redux";
import { products } from "../data/products";
import { addItem } from "../redux/actions";
const ProductList = () => {
    const dispatch=useDispatch()

    return (
    <div>
      {/* <h2>Product</h2> */}

      {products.map(product=>(
        <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <button 
            onClick={()=>dispatch(addItem(product))}>
                Add to cart
            </button>
            </div>
      ))}
    </div>
  );
};

export default ProductList;


//due to addItem now cart:iteym:{purana mamla+qty jud gya hoga}