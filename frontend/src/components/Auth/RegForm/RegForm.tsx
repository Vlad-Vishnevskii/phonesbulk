import Image from "next/image";
import { ChangeEvent, FC, useState } from "react";

import { Button } from "@/ui/Button/Button";

import {
  FormDataCreate,
  FormErrorsLogin,
  SwitchFormProps,
} from "@/types/forms";

import { registerUrl } from "@/lib/endpoints";

export const RegForm: FC<Pick<SwitchFormProps, "switchForm">> = ({
  switchForm,
}) => {
  const [formData, setFormData] = useState<FormDataCreate>({
    name: "",
    email: "",
    phone: "",
    country: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrorsLogin>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [regError, setRegError] = useState<boolean>(false);

  const createNewUser = async (credentials: FormDataCreate) => {
    const {
      name = "",
      email = "",
      phone = "",
      password = "",
    } = credentials || {};
    const uniqueName = `${name}_${Date.now()}`;

    try {
      const response = await fetch(registerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: uniqueName,
          email,
          phone,
          password,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error registration", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validation
    const newErrors: FormErrorsLogin = {};

    if (!formData.name.trim()) {
      newErrors.name = "name should not be empty";
    }

    if (!formData.email.trim()) {
      newErrors.email = "email should not be empty";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "invalid phone";
    }

    if (!formData.password.trim()) {
      newErrors.password = "password should not be empty";
    }

    if (Object.keys(newErrors).length === 0) {
      const credentials = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };

      setLoading(true);

      try {
        const serverResponse = await createNewUser(credentials);
        console.log("serverResponse: ", serverResponse);
        if (serverResponse.error) {
          setRegError(true);
          setErrors({
            name: "",
            phone: "",
            email: "",
            password: "",
          });
          setLoading(false);
        }

        if (serverResponse && serverResponse.user) {
          console.log("serverResponseRegOK: ", serverResponse);
          setLoading(false);
          setRegError(false);
          setFormData({
            name: "",
            phone: "",
            email: "",
            password: "",
          });
          setErrors({
            name: "",
            phone: "",
            email: "",
            password: "",
          });
          switchForm("congrat");
        }
      } catch (error) {
        console.error("Error authorization", error);
      }
    } else {
      // Обновляем состояние ошибок
      setErrors(newErrors);
    }
  };

  return (
    <>
      <div className="mb-2 flex w-full flex-col items-center pt-6">
        <p className="text-2xl font-black text-acsent_orange">New customer</p>
      </div>
      <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit}>
          <div className="relative z-50 mb-2 w-full pl-3 font-light">
            <Image
              src={"/assets/icons/user_ico.svg"}
              alt="name"
              width={20}
              height={20}
              className="absolute left-4 top-0 z-50 translate-y-7"
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
              placeholder="Jhon"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-96 appearance-none rounded-lg border-transparent bg-base_grey py-0 pl-8 focus:border-transparent focus:outline-1 focus:ring-0"
              required
            />
            {errors.name && (
              <p className="mt-1 text-xs font-light text-acsent_red">
                {errors.name}
              </p>
            )}
          </div>
          <div className="relative z-50 mb-2 w-full pl-3 font-light">
            <Image
              src={"/assets/icons/phone_ico.svg"}
              alt="phone"
              width={20}
              height={20}
              className="absolute left-4 top-0 z-50 translate-y-7"
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
              placeholder="+123456789"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-96 appearance-none rounded-lg border-transparent bg-base_grey py-0 pl-8 focus:border-transparent focus:outline-1 focus:ring-0"
              required
            />
            {errors.phone && (
              <p className="mt-1 text-xs font-light text-acsent_red">
                {errors.phone}
              </p>
            )}
          </div>
          <div className="relative z-50 mb-2 w-full pl-3 font-light">
            <Image
              src={"/assets/icons/email_ico.svg"}
              alt="email icon"
              width={20}
              height={20}
              className="absolute left-4 top-0 z-50 translate-y-7"
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
              placeholder="your.email@email.com"
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-96 appearance-none rounded-lg border-transparent bg-base_grey py-0 pl-8 focus:border-transparent focus:outline-1 focus:ring-0"
              required
            />
            {errors.email && (
              <p className="mt-1 text-xs font-light text-acsent_red">
                {errors.email}
              </p>
            )}
          </div>
          <div className="relative z-50 mb-2 w-full pl-3 font-light">
            <Image
              src={"/assets/icons/lock_ico.svg"}
              alt="lock icon"
              width={20}
              height={20}
              className="absolute left-4 top-0 z-50 translate-y-7"
            />
            <label
              htmlFor="password"
              className="block text-start text-sm text-medium_grey"
            >
              Password
              <span className="text-red-600"> *</span>
              <span className="text-primary text-xs">
                {" "}
                (required, at least 6 characters)
              </span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              pattern="^.{6,}$"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-96 appearance-none rounded-lg border-transparent bg-base_grey py-0 pl-8 focus:border-transparent focus:outline-1 focus:ring-0"
              required
            />
            {errors.password && (
              <p className="mt-2 text-xs font-light text-red-500">
                {errors.password}
              </p>
            )}
          </div>
          <div className="flex flex-col items-center">
            <h2
              className={`${
                regError ? "visible" : "invisible"
              } font-light text-red-500`}
            >
              Email are already taken
            </h2>
          </div>
          <Button
            type="submit"
            style="relative mx-auto mt-2 mb-4 flex h-6 w-32 justify-center items-center rounded-lg bg-base_green px-0 py-2 text-white transition duration-500 ease-in-out hover:bg-dark_green"
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
        <div className="flex">
          <p className="mr-1 font-extralight text-ligth_grey">
            Already have an account?
          </p>
          <Button
            style="hover:underline hover:underline-offset-2 text-light_green"
            onClick={() => switchForm("login")}
          >
            SignIn
          </Button>
        </div>
      </div>
    </>
  );
};

export default RegForm;
