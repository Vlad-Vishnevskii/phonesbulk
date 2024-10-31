"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Links } from "@/types/links";

export const MenuBurger = ({ links }: { links: Links[] }) => {
  const [open, setOpen] = useState(false);
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
          <ul className="mt-8 sm:mt-4">
            {links.map(link => (
              <li
                key={String(link.id)}
                className="p-4 sm:px-4 sm:py-2"
              >
                <Link
                  href={link.link}
                  className="text-base font-extrabold text-white hover:text-acsent_orange hover:underline hover:underline-offset-4"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="h-screen w-1/2 "
        ></div>
      </div>
    </div>
  );
};
