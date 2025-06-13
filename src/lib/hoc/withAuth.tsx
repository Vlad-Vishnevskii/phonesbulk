import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

import { useAuthCheck } from "@/hooks/useAuthCheck";

import { getTokenFromLocalCookie } from "../auth";

const withAuth = <P extends object>(WrappedComponent: FC<P>) => {
  const WithAuth: FC<P> = props => {
    const router = useRouter();
    useAuthCheck();

    const isAuthenticated = !!getTokenFromLocalCookie();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/shop");
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuth.displayName = `WithAuth(${WrappedComponent.displayName})`;

  return WithAuth;
};

export default withAuth;
