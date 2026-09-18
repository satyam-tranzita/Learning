import { userAdapter } from "../users/userSlice";

const userSelectors =
  userAdapter.getSelectors(
    state => state.users
  );

export const {
  selectAll: selectUsers,
  selectById: selectUserById,
  selectTotal: selectTotalUsers
} = userSelectors;

export const selectLoading = state =>
  state.users.loading;

export const selectError = state =>
  state.users.error;