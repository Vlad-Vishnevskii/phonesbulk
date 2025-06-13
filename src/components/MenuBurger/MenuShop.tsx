"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuthStore } from "@/store/store";

import useAdminStatus from "@/hooks/isAdmin";

import { MenuItem } from "../LeftMenu/MenuItem/MenuItem";

export const MenuShop = () => {
  const [open, setOpen] = useState(false);
  const isAdmin = useAdminStatus();
  const router = useRouter();

  const { logout } = useAuthStore();

  const handleLogOut: () => void = () => {
    logout();
    router.push("/shop");
  };
  return (
    <div className="hidden h-9 w-10 items-center lg:flex">
      <button
        className="cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <Image
            src="/assets/icons/close.svg"
            width={28}
            height={28}
            alt="burger"
            className="pl-2 sm:size-6"
          />
        ) : (
          <Image
            src="/assets/icons/menu-burger.svg"
            width={40}
            height={36}
            alt="burger"
            className="sm:size-7"
          />
        )}
      </button>
      <div
        className={`absolute left-0 top-3 z-10  flex h-screen w-screen ${open ? "visible" : "hidden"}`}
      >
        <div className="z-10 h-screen min-h-full w-1/2 rounded-b-xl bg-base_green pl-2 pt-4 sm:pl-1">
          <div className="flex min-h-screen flex-col py-6 pl-2 pr-4 md:py-8">
            {!isAdmin ? (
              <div className="flex-grow">
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
            ) : (
              <div className="flex-grow">
                <MenuItem
                  title="Upload products"
                  style="mb-4"
                  link="/admin/"
                />
                <MenuItem
                  title="Send price"
                  style="mb-4"
                  link="/admin/sendmail"
                />
              </div>
            )}
            <div className="mb-6">
              <MenuItem
                title="LogOut"
                link=""
                onClick={handleLogOut}
              />
            </div>
          </div>
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="h-screen w-1/2 "
        ></div>
      </div>
    </div>
  );
};
