import { createSelector } from "@reduxjs/toolkit";
import { userAdapter } from "./userSlice";

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

export const selectFilteredUsers = createSelector(
  [selectUsers, selectSearchTerm],
  (users, searchTerm) => {
    return users.filter(user =>
      user.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }
);

// export const selectUsers = state =>
//   state.users.items;

// export const selectSearchTerm = state =>
//   state.users.searchTerm;

// export const selectTotalUsers = state =>
//   state.users.items.length;

// export const selectActiveUsers = state =>
//   state.users.items.filter(
//     user => user.active
//   ).length;

// export const selectFilteredUsers = createSelector(
//   [
//     selectUsers,
//     selectSearchTerm
//   ],

//   (users, searchTerm) => {
//     return users.filter(user =>
//       user.name
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//     );
//   }
