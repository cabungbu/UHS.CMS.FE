import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  access_token: string | null;
  expires_at: number | null;
  isAuthenticated?: boolean;
}

const initialState: AuthState = {
  access_token: null,
  expires_at: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(
      state,
      action: PayloadAction<{
        access_token: string;
        expires_in: number;
        isAuthenticated: boolean;
      }>
    ) {
      state.access_token = action.payload.access_token;
      state.expires_at = Date.now() + action.payload.expires_in * 1000;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    clearAuth(state) {
      state.access_token = null;
      state.expires_at = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
