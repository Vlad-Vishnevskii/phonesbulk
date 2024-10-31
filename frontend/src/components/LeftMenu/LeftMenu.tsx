"use client";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/store";

import useAdminStatus from "@/hooks/isAdmin";

import Logo from "../Logo/logo";

import { MenuItem } from "./MenuItem/MenuItem";

export const LeftMenu = () => {
  const isAdmin = useAdminStatus();

  const router = useRouter();

  const { logout } = useAuthStore();

  const handleLogOut: () => void = () => {
    logout();
    router.push("/shop");
  };

  return (
    <div className="min-h-screen ">
      <div className="p-2">
        <Logo />
      </div>
      <div className="border-t-2 border-base_green"></div>
      <div className="px-4 py-6 ">
        {isAdmin === false && (
          <div className="flex h-[80dvh] flex-col">
            <MenuItem
              title="Profile"
              style="mb-4"
              link="/user/profile"
            />
            <MenuItem
              title="Checkout"
              style="mb-4"
              link="/user/checkout"
            />
            <MenuItem
              title="Shop"
              link="/shop"
            />
          </div>
        )}
        {isAdmin === true && (
          <div className="flex h-[80dvh] flex-col">
            <MenuItem
              title="Upload products"
              style="mb-4"
              link="/admin"
            />
            <MenuItem
              title="Send price"
              style="mb-4"
              link="/admin/sendmail"
            />
          </div>
        )}
        <div className="self-end">
          <MenuItem
            title="LogOut"
            link=""
            onClick={handleLogOut}
          />
        </div>
      </div>
    </div>
  );
};
