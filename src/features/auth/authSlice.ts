import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthSession } from "../../types/user.types";

function loadSessionFromStorage(): AuthSession | null {
  try {
    const raw = localStorage.getItem("ticketflow_session");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const storedSession = loadSessionFromStorage();

const initialState: AuthSession = {
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
        JSON.stringify(action.payload.user),
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
