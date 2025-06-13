"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

import { Button } from "@/ui/Button/Button";

import { useAuthStore } from "@/store/store";

import { FormUserData, FormUserErrors, UserData } from "@/types/user";

import { getTokenFromLocalCookie } from "@/lib/auth";
import { fetcher } from "@/lib/fetcher";

interface PersonalInfoProps {
  customer?: UserData;
}

export const PersonalInfo: FC<PersonalInfoProps> = ({ customer }) => {
  const [formData, setFormData] = useState<FormUserData>({
    username: customer?.username || "",
    surname: customer?.surname || "",
    title: customer?.title || "",
    email: customer?.email || "",
    country: customer?.country || "",
    phone: customer?.phone || "",
    company_name: customer?.company_name || "",
    wa_num: customer?.wa_num || "",
    telegram: customer?.telegram || "",
    whatsap: customer?.whatsap || "",
    mailing: customer?.mailing,
  });
  const [errors, setErrors] = useState<FormUserErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [regError, setRegError] = useState<boolean>(false);
  const [updated, setUpdated] = useState<boolean>(false);
  const { id } = useAuthStore();
  const router = useRouter();

  const updateUser = async (credentials: FormUserData) => {
    setUpdated(false);
    setRegError(false);
    const {
      username = "",
      surname = "",
      title = "",
      email = "",
      country = "",
      phone = "",
      company_name = "",
      wa_num = "",
      telegram = "",
      whatsap = "",
      mailing = true,
    } = credentials || {};
    const uniqueName = `${username.split("_")[0]}_${Date.now()}`;

    try {
      const token = await getTokenFromLocalCookie();
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: uniqueName,
            surname,
            title,
            email,
            country,
            company_name,
            phone,
            wa_num,
            telegram,
            whatsap,
            mailing,
          }),
        },
      );
      return response;
    } catch (error) {
      console.log("Error update info", error);
      setUpdated(false);
      setLoading(false);
      setRegError(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validation
    const newErrors: FormUserErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "name should not be empty";
    }

    if (!formData.email.trim()) {
      newErrors.email = "email should not be empty";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "invalid phone";
    }

    if (Object.keys(newErrors).length === 0) {
      const credentials = {
        username: formData.username,
        surname: formData.surname,
        title: formData.title,
        email: formData.email,
        country: formData.country,
        phone: formData.phone,
        company_name: formData.company_name,
        wa_num: formData.wa_num,
        telegram: formData.telegram,
        whatsap: formData.whatsap,
        mailing: formData.mailing,
      };

      setLoading(true);

      try {
        const serverResponse = await updateUser(credentials);
        if (serverResponse.error) {
          setRegError(true);
          setErrors({
            username: "",
            phone: "",
            email: "",
            password: "",
          });
          setLoading(false);
        }
        if (serverResponse && serverResponse.id) {
          setUpdated(true);
          setLoading(false);
          setRegError(false);
          setErrors({
            username: "",
            phone: "",
            email: "",
          });
          router.refresh();
        }
      } catch (error) {
        console.error("Error updated info", error);
        setRegError(true);
      }
    } else {
      // Обновляем состояние ошибок
      setErrors(newErrors);
    }
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between gap-2">
          <div className="relative mb-2 w-full pl-3 font-light">
            <Image
              src={"/assets/icons/user_ico.svg"}
              alt="name"
              width={20}
              height={20}
              className="absolute left-4 top-0 z-10 translate-y-6"
            />
            <label
              htmlFor="username"
              className="block text-start text-sm text-medium_grey"
            >
              Name
              <span className="text-red-600"> *</span>
              <span className="text-primary text-xs"> (required)</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username.split("_")[0]}
              onChange={handleChange}
              className="mt-0 block w-60 appearance-none rounded-lg border-transparent bg-base_grey py-0 pl-8 focus:border-transparent focus:outline-1 focus:ring-0 sm:w-40"
              required
            />
            {errors.username && (
              <p className="mt-1 text-xs font-light text-acsent_red">
                {errors.username}
              </p>
            )}
          </div>
          <div className="relative mb-2 w-full pl-3 font-light">
            <Image
              src={"/assets/icons/user_ico.svg"}
              alt="surname"
              width={20}
              height={20}
              className="absolute left-4 top-0 z-10 translate-y-6"
            />
            <label
              htmlFor="surname"
              className="block text-start text-sm text-medium_grey"
            >
              Surname
            </label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={formData.surname || ""}
              onChange={handleChange}
              className="mt-0 block w-60 appearance-none rounded-lg border-transparent bg-base_grey py-0 pl-8 focus:border-transparent focus:outline-1 focus:ring-0 sm:w-40"
            />
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <div className="relative mb-2 w-full pl-3 font-light">
            <Image
              src={"/assets/icons/user_ico.svg"}
              alt="title"
              width={20}
              height={20}
              className="absolute left-4 top-0 z-10 translate-y-6"
            />
            <label
              htmlFor="title"
              className="block text-start text-sm text-medium_grey"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              className="mt-0 block w-60 appearance-none rounded-lg border-transparent bg-base_grey py-0 pl-8 focus:border-transparent focus:outline-1 focus:ring-0 sm:w-40"
            />
          </div>
          <div className="relative mb-2 w-full pl-3 font-light">
            <Image
              src={"/assets/icons/email_ico.svg"}
              alt="email"
              width={20}
              height={20}
              className="absolute left-4 top-0 z-10 translate-y-6"
            />
            <label
              htmlFor="email"
              className="block text-start text-sm text-medium_grey"
            >
              Email
              <span className="text-red-600"> *</span>
              <span className="text-primary text-xs"> (required)</span>
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email || ""}
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              onChange={handleChange}
              className="mt-0 block w-60 appearance-none rounded-lg border-transparent bg-base_grey py-0 pl-8 focus:border-transparent focus:outline-1 focus:ring-0 sm:w-40"
              required
            />
            {errors.email && (
              <p className="mt-1 text-xs font-light text-acsent_red">
                {errors.email}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <div className="relative mb-2 w-full pl-3 font-light">
            <Image
              src={"/assets/icons/country_ico.svg"}
              alt="country"
              width={20}
              height={20}
              className="absolute left-4 top-0 z-10 translate-y-6"
            />
            <label
              htmlFor="country"
              className="block text-start text-sm text-medium_grey"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country || ""}
              onChange={handleChange}
              className="mt-0 block w-60 appearance-none rounded-lg border-transparent bg-base_grey py-0 pl-8 focus:border-transparent focus:outline-1 focus:ring-0 sm:w-40"
            />
          </div>
          <div className="relative mb-2 w-full pl-3 font-light">
            <Image
              src={"/assets/icons/phone_ico.svg"}
              alt="phone"
              width={20}
              height={20}
              className="absolute left-4 top-0 z-10 translate-y-6"
            />
            <label
              htmlFor="phone"
              className="block text-start text-sm text-medium_grey"
            >
              Phone
              <span className="text-red-600"> *</span>
              <span className="text-primary text-xs"> (required)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              className="mt-0 block w-60 appearance-none rounded-lg border-transparent bg-base_grey py-0 pl-8 focus:border-transparent focus:outline-1 focus:ring-0 sm:w-40"
              required
            />
            {errors.phone && (
              <p className="mt-1 text-xs font-light text-acsent_red">
                {errors.phone}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <div className="relative mb-2 w-full pl-3 font-light">
            <Image
              src={"/assets/icons/company_ico.svg"}
              alt="company name"
              width={20}
              height={20}
              className="absolute left-4 top-0 z-10 translate-y-6"
            />
            <label
              htmlFor="company_name"
              className="block text-start text-sm text-medium_grey"
            >
              Company
            </label>
            <input
              type="text"
              id="company_name"
              name="company_name"
              value={formData.company_name || ""}
              onChange={handleChange}
              className="mt-0 block w-60 appearance-none rounded-lg border-transparent bg-base_grey py-0 pl-8 focus:border-transparent focus:outline-1 focus:ring-0 sm:w-40"
            />
          </div>
          <div className="relative z-50 mb-2 w-full pl-3 font-light">
            <Image
              src={"/assets/icons/wa_ico.svg"}
              alt="WA №"
              width={20}
              height={20}
              className="absolute left-4 top-0 z-50 translate-y-6"
            />
            <label
              htmlFor="wa_num"
              className="block text-start text-sm text-medium_grey"
            >
              WA №
            </label>
            <input
              type="text"
              id="wa_num"
              name="wa_num"
              value={formData.wa_num || ""}
              onChange={handleChange}
              className="mt-0 block w-60 appearance-none rounded-lg border-transparent bg-base_grey py-0 pl-8 focus:border-transparent focus:outline-1 focus:ring-0 sm:w-40"
            />
          </div>
        </div>
        <div className="mb-4 flex justify-between gap-2">
          <div className="relative mb-2 w-full pl-3 font-light">
            <Image
              src={"/assets/icons/telegram_ico.svg"}
              alt="telegram"
              width={20}
              height={20}
              className="absolute left-4 top-0 z-10 translate-y-6"
            />
            <label
              htmlFor="telegram"
              className="block text-start text-sm text-medium_grey"
            >
              Telegram
            </label>
            <input
              type="text"
              id="telegram"
              name="telegram"
              value={formData.telegram || ""}
              onChange={handleChange}
              className="mt-0 block w-60 appearance-none rounded-lg border-transparent bg-base_grey py-0 pl-8 focus:border-transparent focus:outline-1 focus:ring-0 sm:w-40"
            />
          </div>
          <div className="relative z-50 mb-2 w-full pl-3 font-light">
            <Image
              src={"/assets/icons/whatsap_ico.svg"}
              alt="whatsap"
              width={20}
              height={20}
              className="absolute left-4 top-0 z-50 translate-y-6"
            />
            <label
              htmlFor="whatsap"
              className="block text-start text-sm text-medium_grey"
            >
              Whatsap
            </label>
            <input
              type="text"
              id="whatsap"
              name="whatsap"
              value={formData.whatsap || ""}
              onChange={handleChange}
              className="mt-0 block w-60 appearance-none rounded-lg border-transparent bg-base_grey py-0 pl-8 focus:border-transparent focus:outline-1 focus:ring-0 sm:w-40"
            />
          </div>
        </div>
        <div className="mb-4 flex w-full justify-between pl-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="mailing"
              name="mailing"
              checked={formData.mailing}
              onChange={handleChange}
              className="appearance-none rounded-md border-base_grey bg-base_grey text-dark_green focus:ring-transparent"
            />
            <p className="text-medium_grey sm:text-[10px]">
              I want to receive the price list by email{" "}
            </p>
          </div>
          <Button
            type="submit"
            style="relative flex h-6 w-32 justify-center items-center rounded-lg bg-base_green px-0 py-3 text-white transition duration-500 ease-in-out hover:bg-dark_green"
          >
            {loading ? "" : "Update"}
            {loading && (
              <Image
                alt="loading"
                src={"/assets/images/loader.svg"}
                quality={80}
                width={30}
                height={30}
                style={{
                  margin: "0 auto",
                  position: "absolute",
                }}
              />
            )}
          </Button>
        </div>
      </form>
      {updated && (
        <div className="w-full text-center">
          {" "}
          <p className="text-sm text-dark_green">updated successfuly</p>
        </div>
      )}
      {regError && (
        <div className="w-full text-center">
          <p className="text-sm text-acsent_red">
            Oops... something went wrong. Try again
          </p>
        </div>
      )}
    </div>
  );
};
