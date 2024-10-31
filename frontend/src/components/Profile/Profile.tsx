"use client";

import { FC, useEffect, useState } from "react";

import { UserData } from "@/types/user";

import { AvatarChange } from "./AvatarChange";
import { PersonalInfo } from "./PersonalInfo";
import { getTokenFromLocalCookie, getUserFromLocalCookie } from "@/lib/auth";
import withAuth from "@/lib/hoc/withAuth";

const ProfileComponent: FC = () => {
  const [customer, setCustomer] = useState<UserData>();
  useEffect(() => {
    const getUser = async () => {
      const token = await getTokenFromLocalCookie();
      if (token) {
        const response: UserData = await getUserFromLocalCookie(token);
        if (response && response.id) {
          setCustomer(response);
        }
      }
    };
    getUser();
  }, []);
  return (
    <div className="mx-16 pt-7 xl:mx-8 lg:mx-0 md:pt-16 sm:mx-1 sm:pt-8">
      <h2 className="mb-6 text-[30px] font-black text-dark_green lg:text-2xl sm:mb-1 sm:mt-2 sm:text-center sm:text-[20px]">
        Change my account information
      </h2>
      <div className="flex gap-20 lg:gap-4 sm:flex-col sm:gap-0">
        <div className="flex flex-col items-center">
          <h3 className="mb-8 text-2xl font-black text-base_green lg:text-xl sm:mb-2 sm:mt-2 sm:text-center sm:text-[20px] ">
            Avatar
          </h3>
          {customer && <AvatarChange avatar={customer?.avatar} />}
        </div>
        <div className="flex flex-col">
          <h3 className="mb-6 pl-2 text-2xl font-black text-base_green lg:text-xl sm:mb-1 sm:mt-2 sm:text-center sm:text-[20px]">
            Personal
          </h3>
          {customer && <PersonalInfo customer={customer} />}
        </div>
      </div>
    </div>
  );
};

export const Profile = withAuth(ProfileComponent);
