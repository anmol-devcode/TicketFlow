import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthSession, User } from "../../types/user.types";

 export interface AuthState{
  user: User | null;
  token: string | null;
}

function loadSessionFromStorage(): AuthSession | null {
  try {
    const raw = localStorage.getItem("ticketflow_session");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const storedSession = loadSessionFromStorage();

const initialState: AuthState = {
  user: storedSession?.user ?? null,
  token: storedSession?.token ?? null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sessionStarted(state, action: PayloadAction<AuthSession>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem(
        "ticketflow_session",
        JSON.stringify(action.payload),
      );
      localStorage.setItem(
        "ticketflow_token",
        JSON.stringify(action.payload.token),
      );
    },

    sessionEnded(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("ticketflow_session");
      localStorage.removeItem("ticketflow_token");
    },
  },
});

export const { sessionStarted, sessionEnded } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  Boolean(state.auth.token);

