import { StateCreator } from "zustand";

import { setToken, unsetToken } from "@/lib/auth";

export interface AuthState {
  auth: boolean;
  email: string;
  id: string;
  login: (token: string, email: string, id: string) => void;
  logout: () => void;
}

export const createAuthSlice: StateCreator<AuthState> = (set, get) => ({
  auth: false,
  email: "",
  id: "",

  login: (token, email, id) => {
    setToken("token", token);
    set({ auth: true, email, id });
  },

  logout: () => {
    unsetToken("token");
    set({ auth: false, email: "", id: "" });
  },
});
