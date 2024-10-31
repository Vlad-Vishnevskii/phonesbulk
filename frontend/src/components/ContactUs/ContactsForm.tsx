"use client";

import Image from "next/image";
import { ChangeEvent, FC, useState } from "react";

import { Button } from "@/ui/Button/Button";

import { FormContacts, FormErrorsContacts } from "@/types/forms";

import { sendTelegram } from "@/app/actions";

export const ContactsForm: FC = () => {
  const [formData, setFormData] = useState<FormContacts>({
    name: "",
    email: "",
    phone: "",
    messText: "",
  });
  const [errors, setErrors] = useState<FormErrorsContacts>({});
  const [loading, setLoading] = useState(false);
  const [isSend, setIsSend] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>,
  ) => {
    setIsSend(false);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSend(false);
    e.preventDefault();
    // Validation
    const newErrors: FormErrorsContacts = {};

    if (!formData.name.trim()) {
      newErrors.email = "incorrect name";
    }
    if (!formData.email.trim()) {
      newErrors.email = "incorrect email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "incorrect phone";
    }

    if (!formData.messText.trim()) {
      newErrors.messText = "incorrect message";
    }

    if (Object.keys(newErrors).length === 0) {
      const credentials = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        messText: formData.messText,
      };

      setLoading(true);

      try {
        await sendTelegram(false, "", credentials);
        setIsSend(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          messText: "",
        });
        setErrors({
          name: "",
          email: "",
          phone: "",
          messText: "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error send telegram", error);
      }
    } else {
      // Обновляем состояние ошибок
      setErrors(newErrors);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit}>
        <div className="relative mb-1 w-full pl-3 font-light">
          <Image
            src={"/assets/icons/user_ico.svg"}
            alt="name"
            width={20}
            height={20}
            className="absolute left-4 top-0 translate-y-7"
          />
          <label
            htmlFor="name"
            className="block text-start text-sm text-medium_grey"
          >
            Name
            <span className="text-red-600"> *</span>
            <span className="text-primary text-xs"> (required)</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-96 appearance-none rounded-lg border-transparent bg-base_grey py-0 pl-8 focus:border-transparent focus:outline-1 focus:ring-0 sm:w-80"
            required
          />
          {errors.name && (
            <p className="mt-1 text-xs font-light text-acsent_red">
              {errors.name}
            </p>
          )}
        </div>
        <div className="relative mb-1 w-full pl-3 font-light">
          <Image
            src={"/assets/icons/email_ico.svg"}
            alt="email"
            width={20}
            height={20}
            className="absolute left-4 top-0 translate-y-7"
          />
          <label
            htmlFor="name"
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
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-96 appearance-none rounded-lg border-transparent bg-base_grey py-0 pl-8 focus:border-transparent focus:outline-1 focus:ring-0 sm:w-80"
            required
          />
          {errors.email && (
            <p className="mt-1 text-xs font-light text-acsent_red">
              {errors.email}
            </p>
          )}
        </div>
        <div className="relative mb-4 w-full pl-3 font-light">
          <Image
            src={"/assets/icons/phone_ico.svg"}
            alt="phone"
            width={20}
            height={20}
            className="absolute left-4 top-0 translate-y-7"
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
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-96 appearance-none rounded-lg border-transparent bg-base_grey py-0 pl-8 focus:border-transparent focus:outline-1 focus:ring-0 sm:w-80"
            required
          />
          {errors.phone && (
            <p className="mt-1 text-xs font-light text-acsent_red">
              {errors.phone}
            </p>
          )}
        </div>
        <div className="relative mb-2 w-full pl-3 font-light">
          <textarea
            name="messText"
            value={formData.messText}
            onChange={handleChange}
            placeholder="Type your message here..."
            className="mt-1 block w-96 resize-none appearance-none rounded-lg border-transparent bg-base_grey py-0 pl-2 text-sm focus:border-transparent focus:outline-1 focus:ring-0 sm:w-80"
            rows={4}
            required
          />
        </div>
        <div className="mb-2 flex flex-col items-center md:mb-2">
          <h2
            className={`${
              isSend ? "visible" : "invisible"
            } mb-2 font-light text-base_green md:mb-2`}
          >
            Your message has been sent
          </h2>
        </div>
        <Button
          type="submit"
          style="relative mx-auto mb-2 flex h-6 w-32 justify-center items-center rounded-lg bg-base_green px-0 py-2 text-white transition duration-500 ease-in-out hover:bg-dark_green"
        >
          {loading ? "" : "OK"}
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
      </form>
    </div>
  );
};
