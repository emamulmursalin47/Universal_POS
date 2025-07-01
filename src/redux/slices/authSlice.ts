import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type TUser = {
  _id: string;
  userId: string;
  email: string;
  role: string;
  name: string;
  storeName: string;
};

type TAuthState = {
  user: TUser | null;
  token: string | null;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions; //This line exports the setUser and logOut actions, allowing you to dispatch these actions from components or other parts of the application.
export default authSlice.reducer; //This reducer handles state updates for the auth slice and will be added to the Redux store.

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
