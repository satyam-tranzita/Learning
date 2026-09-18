import { createSlice,createEntityAdapter } from "@reduxjs/toolkit";

// const initialState = {
//   items: [],
//   searchTerm: ""
// };

const userAdapter=createEntityAdapter();

const initialState=userAdapter.getInitialState({
  searchTerm:""
})
//it automatically creates-->id,entities,searchTerm(extra diya hai)



const userSlice = createSlice({
  name: "users",

  initialState,

  reducers: {
    // addUser(state, action) {
    //   state.items.push(action.payload);
    // },

    // deleteUser(state, action) {
    //   state.items = state.items.filter(
    //     user => user.id !== action.payload
    //   );
    // },

    // setSearchTerm(state, action) {
    //   state.searchTerm = action.payload;
    // }


    addUser:userAdapter.addOne,
    addusers:userAdapter.addMany,
    deleteUser:userAdapter.removeOne,
    updateUser:userAdapter.updateOne,
    setUsers: userAdapter.setAll,
    clearUsers: userAdapter.removeAll,
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    }

  }
});
export const {
  addUser,
  addUsers,
  deleteUser,
  updateUser,
  setUsers,
  clearUsers,
  setSearchTerm
} = userSlice.actions;

export default userSlice.reducer;

export { userAdapter };