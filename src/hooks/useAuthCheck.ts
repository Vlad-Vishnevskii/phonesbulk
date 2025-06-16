import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuthStore } from "@/store/store";

import { getTokenFromLocalCookie, getUserFromLocalCookie } from "@/lib/auth";

let isAuthCheckInitialized = false;

export const useAuthCheck = () => {
  const { login, logout } = useAuthStore();
  const router = useRouter();
  const currentPath = usePathname();

  useEffect(() => {
    if (isAuthCheckInitialized) {
      return;
    }
    const validateToken = async () => {
      const token = await getTokenFromLocalCookie();

      if (!token) {
        if (
          currentPath !== "/" &&
          currentPath !== "/shop" &&
          currentPath !== "/macbook" &&
          currentPath !== "/macbook-price-list" &&
          currentPath !== "/restore-pass"
        ) {
          router.push("/shop");
        }
        return;
      }

      try {
        const response = await getUserFromLocalCookie(token);

        if (response.error) {
          logout();
          if (currentPath !== "/" && currentPath !== "/shop") {
            router.push("/shop");
          }
          return;
        }

        if (response.id) {
          const { email, id } = response;
          login(token, email, id);
        }
      } catch (error) {
        console.error("Error validating token:", error);
      }
    };

    validateToken();
    isAuthCheckInitialized = true;
    // eslint-disable-next-line
  }, []);
};
