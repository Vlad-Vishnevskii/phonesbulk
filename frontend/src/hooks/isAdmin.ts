import { useEffect, useLayoutEffect, useState } from "react";

import { checkStatus } from "@/lib/auth";

function useAdminStatus() {
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);

  useLayoutEffect(() => {
    const getStatus = async () => {
      const status = await checkStatus();
      setIsAdmin(status);
    };

    getStatus();
  }, []);

  return isAdmin; // Хук возвращает текущий статус пользователя (true, false, или undefined)
}

export default useAdminStatus;
