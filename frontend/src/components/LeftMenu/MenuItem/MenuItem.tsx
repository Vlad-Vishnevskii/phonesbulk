"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  iconCart,
  iconLogOut,
  iconProfile,
  iconSendPrice,
  iconShop,
  iconUploadProducts,
} from "@/lib/svg";

export const MenuItem = ({
  title,
  style,
  link,
  onClick,
}: {
  title: string;
  style?: string;
  link: string;
  onClick?: () => void;
}) => {
  const path = usePathname();

  return (
    <div className="group">
      <Link
        href={link ? link : ""}
        className={`flex gap-2 ${style}`}
      >
        {title === "Profile" && (
          <div
            className={`stroke-white group-hover:stroke-acsent_orange ${path === link ? "stroke-acsent_orange" : "stroke-white"}`}
          >
            {iconProfile}
          </div>
        )}
        {title === "Checkout" && (
          <div
            className={`stroke-white group-hover:stroke-acsent_orange ${path === link ? "stroke-acsent_orange" : "stroke-white"}`}
          >
            {iconShop}
          </div>
        )}
        {title === "Shop" && (
          <div
            className={`stroke-white group-hover:stroke-acsent_orange ${path === link ? "stroke-acsent_orange" : "stroke-white"}`}
          >
            {iconCart}
          </div>
        )}
        {title === "Upload products" && (
          <div
            className={`stroke-white ${path === link ? "stroke-acsent_orange" : "stroke-white"} group-hover:stroke-acsent_orange`}
          >
            {iconUploadProducts}
          </div>
        )}
        {title === "Send price" && (
          <div
            className={`stroke-white group-hover:stroke-acsent_orange ${path === link ? "stroke-acsent_orange" : "stroke-white"}`}
          >
            {iconSendPrice}
          </div>
        )}

        <div
          className={`text-lg font-black  group-hover:text-acsent_orange sm:text-sm ${path === link ? "text-acsent_orange" : "text-white"}`}
        >
          {title !== "LogOut" ? title : ""}
        </div>
      </Link>
      {title === "LogOut" && (
        <button
          className="flex gap-2"
          onClick={onClick}
        >
          <div className="stroke-white group-hover:stroke-acsent_orange">
            {iconLogOut}
          </div>
          <p
            className={`text-lg font-black  group-hover:text-acsent_orange sm:text-sm ${path === link ? "text-acsent_orange" : "text-white"}`}
          >
            LogOut
          </p>
        </button>
      )}
    </div>
  );
};
