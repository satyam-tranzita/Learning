//here state is store
import { createSelector } from "@reduxjs/toolkit";

import { userAdapter } from "./userSlice";

//get usersSelector using userAdapter
const userSelectors = userAdapter.getSelectors(
  state => state.users
);


export const {
  selectAll: selectUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  selectTotal: selectTotalUsers
} = userSelectors;

export const selectSearchTerm = state =>
  state.users.searchTerm;

//input,result function
export const selectFilteredUsers = createSelector(
  [
    selectUsers,
    selectSearchTerm
  ],

  (users, searchTerm) => {
    return users.filter(user =>
      user.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }
);

export const selectActiveUsers = createSelector(
  [selectUsers],

  users =>
    users.filter(user => user.active)
);