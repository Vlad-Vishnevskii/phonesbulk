import Image from "next/image";
import { ChangeEvent, FC, useState } from "react";

import { Button } from "@/ui/Button/Button";

import { FormDataLogin, FormErrorsLogin, SwitchFormProps } from "@/types/forms";

import { forgotPassword, getUserFromEmail } from "@/lib/auth";

export const RestorePass: FC<Pick<SwitchFormProps, "switchForm">> = ({
  switchForm,
}) => {
  const [formData, setFormData] = useState<Pick<FormDataLogin, "email">>({
    email: "",
  });
  const [user, setUser] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrorsLogin>({});
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<boolean>(false);

  const checkUserByEmail = async (email: string) => {
    try {
      const response = await getUserFromEmail(email);
      if (response?.length > 0) {
        setUser(true);
        const sendEmail = await forgotPassword(email);
        setAuthError(false);
        setFormData({
          email: "",
        });
        setErrors({
          email: "",
        });
        setLoading(false);
      } else {
        setAuthError(true);
        setFormData({
          email: "",
        });
        setErrors({
          email: "",
        });
        setLoading(false);
      }
    } catch (error) {
      console.log("Error restore password", error);
      setLoading(false);
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
    if (Object.keys(newErrors).length === 0) {
      const email = formData.email;

      setLoading(true);

      try {
        checkUserByEmail(email);
      } catch (error) {
        console.error("Error restore password", error);
      }
    } else {
      // Обновляем состояние ошибок
      setErrors(newErrors);
    }
  };

  return (
    <>
      <div className="flex h-full flex-grow  items-center justify-center">
        <div className="mb-1 mt-10 flex h-full w-full flex-col items-center justify-center pl-6 pr-4 sm:pl-2">
          <p className="text-2xl font-black text-acsent_orange">
            Restore password
          </p>
          <form onSubmit={handleSubmit}>
            <div className="relative z-50 mb-2 w-full pl-3 text-center font-light">
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
                className="mb-2 mt-1 block w-96 appearance-none rounded-lg border-transparent bg-base_grey py-0 pl-9 focus:border-transparent focus:outline-1 focus:ring-0 sm:w-80"
                required
              />
              {errors.email && (
                <p className="mt-1 text-xs font-light text-acsent_red">
                  {errors.email}
                </p>
              )}
              <p
                className={`mx-auto mb-2 mr-2 text-xs font-light text-acsent_red ${authError ? "visible" : "invisible"}`}
              >
                Customer not found
              </p>
            </div>
            <Button
              type="submit"
              style="relative mx-auto mb-6 flex h-6 w-32 justify-center items-center rounded-lg bg-base_green px-0 py-2 text-white transition duration-500 ease-in-out hover:bg-dark_green"
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
          <p
            className={`mb-6 pt-1 text-center font-light text-base_grey ${user ? "visible" : "invisible"}`}
          >
            We have sent password recovery instructions to your email. Please,
            check it out and come back as soon as possible.
          </p>
          <Button
            style="font-bold text-light_green hover:underline hover:underline-offset-2 mb-20"
            onClick={() => switchForm("login")}
          >
            back to login
          </Button>
        </div>
      </div>
    </>
  );
};
