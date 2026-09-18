import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"


const productAdapter=createEntityAdapter();
const initialState=productAdapter.getInitialState();
//it means -->items[]

const productSlice=createSlice({
    name:"products",
    initialState,
    reducers:{
       addProduct:productAdapter.addOne,
       addProducts:productAdapter.addMany,
       deleteProduct:productAdapter.removeOne,
       updateProduct:productAdapter.updateOne,
       setProduct:productAdapter.setAll,
       clearProducts:productAdapter.removeAll,

    }
})

export const {  
addProduct,
  addProducts,
  deleteProduct,
  updateProduct,
  setProducts,
  clearProducts
} = productSlice.actions;

export default productSlice.reducer;

export { productAdapter };