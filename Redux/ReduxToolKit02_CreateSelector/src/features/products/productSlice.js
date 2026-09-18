import { createSlice } from "@reduxjs/toolkit"
import reducer from "../users/userSlice"

const initialState={
    items:[]
}

const productSlice=createSlice({
    name:"products",
    initialState,
    reducers:{
        addProduct(state,action){
            state.items.push(action.payload)
        },
        deleteProduct(state,action){
            state.items=state.items.filter(item=>item.id !== action.payload.id)
        },
    }
})


export const {
  addProduct,
  deleteProduct
} = productSlice.actions;

export default productSlice.reducer;