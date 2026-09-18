import { productAdapter } from "./productSlice";

const productSelectors=productAdapter.getSelectors(
  state=>state.products
)

export const {
  selectAll: selectProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
  selectTotal: selectTotalProducts
} = productSelectors;