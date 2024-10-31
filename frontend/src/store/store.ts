import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { AuthState, createAuthSlice } from "./slices/createAuthSlice";
import { CartSlice, createCartSlice } from "./slices/createCartSlice";

export const useCartStore = create<CartSlice>()(
  persist(
    (...a) => ({
      ...createCartSlice(...a),
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useAuthStore = create<AuthState>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
