import Image from "next/image";
import { useEffect, useState } from "react";

import { useAuthStore } from "@/store/store";

import { AdminMenu } from "./AdminMenu";
import { CustomerMenu } from "./CustomerMenu";
import { getTokenFromLocalCookie, getUserFromLocalCookie } from "@/lib/auth";

export const AvatarMenu = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { logout } = useAuthStore();

  const handleLogOut: () => void = () => {
    logout();
  };

  const handleShowMenu: () => void = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const getUser = async () => {
      const token = await getTokenFromLocalCookie();
      if (token) {
        const response = await getUserFromLocalCookie(token);
        if (response && response.id) {
          if (response.is_admin === true) {
            setIsAdmin(true);
          }
          if (typeof response.avatar === "string") {
            setAvatar(response.avatar);
          }
        }
      }
    };
    getUser();
  }, []);

  return (
    <>
      <div className="relative">
        <div
          className="flex cursor-pointer gap-2"
          onClick={handleShowMenu}
        >
          <Image
            src={avatar === "" ? "/assets/icons/avatar.svg" : avatar}
            width={30}
            height={30}
            alt="avatar"
            className="rounded-full sm:size-6"
          />
          {!showMenu ? (
            <Image
              src="/assets/icons/chevron-down.svg"
              width={16}
              height={16}
              alt="avatar"
              className="cursor-pointer"
            />
          ) : (
            <Image
              src="/assets/icons/chevron-up.svg"
              width={16}
              height={16}
              alt="avatar"
              className="cursor-pointer"
            />
          )}
        </div>
        {showMenu && (
          <div className="absolute -left-16 top-10 flex flex-col items-start gap-3 rounded-lg bg-base_green p-2 font-bold text-ligth_grey md:-left-2 sm:-left-16 sm:top-9">
            {isAdmin ? (
              <AdminMenu logout={handleLogOut} />
            ) : (
              <CustomerMenu logout={handleLogOut} />
            )}
          </div>
        )}
      </div>
    </>
  );
};
