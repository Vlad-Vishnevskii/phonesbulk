import Image from "next/image";
import { ChangeEvent, FC, useState } from "react";

import { Button } from "@/ui/Button/Button";

import { FormDataLogin, FormErrorsLogin, SwitchFormProps } from "@/types/forms";

import { ForgotPass } from "./ForgotPass";
import { loginUrl } from "@/lib/endpoints";

export const LoginForm: FC<Omit<SwitchFormProps, "onOpen">> = ({
  switchForm,
  login,
  onClose,
}) => {
  const [formData, setFormData] = useState<FormDataLogin>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrorsLogin>({});
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<boolean>(false);

  const getAuth = async (credentials: FormDataLogin) => {
    const { email, password } = credentials;
    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email,
          password,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error auth", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthError(false);
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

    if (!formData.email.trim()) {
      newErrors.email = "incorrect email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "password not be empty";
    }

    if (Object.keys(newErrors).length === 0) {
      const credentials = {
        email: formData.email,
        password: formData.password,
      };

      setLoading(true);

      try {
        const serverResponse = await getAuth(credentials);
        if (serverResponse.error) {
          setAuthError(true);
          setFormData({
            email: "",
            password: "",
          });
          setErrors({
            email: "",
            password: "",
          });
          setLoading(false);
        }

        if (serverResponse && serverResponse.user) {
          setLoading(false);
          setAuthError(false);
          if (serverResponse && serverResponse.jwt) {
            const { jwt, user } = serverResponse;
            const { email, id } = user;
            const idToString = id.toString();
            login(jwt, email, idToString);
            onClose();
          }
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
      <div className="mb-3 flex w-full flex-col items-center pt-7">
        <p className="text-2xl font-black text-acsent_orange">Login</p>
      </div>
      <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit}>
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
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="your.email@email.com"
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
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-96 appearance-none rounded-lg border-transparent bg-base_grey py-0 pl-8 focus:border-transparent focus:outline-1 focus:ring-0 sm:w-80"
              required
            />
            {errors.password && (
              <p className="mt-2 text-xs font-light text-red-500">
                {errors.password}
              </p>
            )}
          </div>
          <div className="mb-2 flex flex-col items-center md:mb-2">
            <h2
              className={`${
                authError ? "visible" : "invisible"
              } mb-2 font-light text-red-500 md:mb-2`}
            >
              Invalid email or password
            </h2>
          </div>
          <Button
            type="submit"
            style="relative mx-auto mb-8 flex h-6 w-32 justify-center items-center rounded-lg bg-base_green px-0 py-2 text-white transition duration-500 ease-in-out hover:bg-dark_green"
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
        <div className="mb-16 flex">
          <p className="mr-1 font-extralight text-ligth_grey">
            Haven&apos;t account yet?
          </p>
          <Button
            style="hover:underline hover:underline-offset-2 text-light_green"
            onClick={() => switchForm("register")}
          >
            SignUp
          </Button>
        </div>
        <ForgotPass switchForm={switchForm} />
      </div>
    </>
  );
};

export default LoginForm;
