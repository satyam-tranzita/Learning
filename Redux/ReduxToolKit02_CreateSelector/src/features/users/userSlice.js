import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  searchTerm: ""
};

const userSlice = createSlice({
  name: "users",

  initialState,

  reducers: {
    addUser(state, action) {
      state.items.push(action.payload);
    },

    deleteUser(state, action) {
      state.items = state.items.filter(
        user => user.id !== action.payload
      );
    },

    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    }
  }
});

export const {
  addUser,
  deleteUser,
  setSearchTerm
} = userSlice.actions;

export default userSlice.reducer;