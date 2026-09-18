import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from "@reduxjs/toolkit";

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState({
  loading: false,
  error: null
});

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",

  async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch users"
      );
    }

    const data = await response.json();

    return data;
  }
);

const userSlice = createSlice({
  name: "users",

  initialState,

  reducers: {},

  extraReducers: builder => {

    builder

      .addCase(
        fetchUsers.pending,
        state => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchUsers.fulfilled,
        (state, action) => {

          state.loading = false;
          state.error = null;

          userAdapter.setAll(
            state,
            action.payload
          );
        }
      )

      .addCase(
        fetchUsers.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.error.message ||
            "Something went wrong";
        }
      );
  }
});

export default userSlice.reducer;

export { userAdapter };