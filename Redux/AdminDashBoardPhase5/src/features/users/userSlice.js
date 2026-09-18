import {
  createSlice,
  createEntityAdapter
} from "@reduxjs/toolkit";

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState({
  searchTerm: ""
});

//{users:{id,entities,searchTerm}}

const userSlice = createSlice({
  name: "users",

  initialState,

  reducers: {
    addUser: userAdapter.addOne,

    addUsers: userAdapter.addMany,

    deleteUser: userAdapter.removeOne,

    updateUser: userAdapter.updateOne,

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