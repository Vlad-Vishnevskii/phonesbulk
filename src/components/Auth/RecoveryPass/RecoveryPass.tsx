"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

import { Button } from "@/ui/Button/Button";

import { FormDataLogin, FormErrorsLogin } from "@/types/forms";

import { resetPassword } from "@/lib/auth";

export default function RecoveryPass() {
  const [formData, setFormData] = useState<Omit<FormDataLogin, "email">>({
    password: "",
  });
  const [recovered, setRecovered] = useState(false);
  const [errors, setErrors] = useState<FormErrorsLogin>({});
  const [loading, setLoading] = useState(false);
  const [recoveryError, setRecoveryError] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const getRecovery = async (code: string, password: string) => {
    try {
      const response = await resetPassword(code, password);
      console.log("response: ", response);
      if (response && response.jwt) {
        setRecovered(true);
        setRecoveryError(false);
        setLoading(false);
        setFormData({
          password: "",
        });
        setErrors({
          password: "",
        });
        router.push("/");
      } else {
        setRecoveryError(true);
        setRecovered(false);
        setLoading(false);
        setFormData({ password: "" });
        setErrors({
          password: "",
        });
      }
    } catch (error) {
      console.log("Error recovery pass", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRecoveryError(false);
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

    if (!formData.password.trim()) {
      newErrors.password = "invalid password";
    }

    if (Object.keys(newErrors).length === 0) {
      const password = formData.password;
      const urlSearchParams = new URLSearchParams(searchParams.toString());
      const codeFromUrl = urlSearchParams.get("code");
      if (codeFromUrl) {
        setLoading(true);
        try {
          if (codeFromUrl && codeFromUrl !== "") {
            const serverResponse = await getRecovery(codeFromUrl, password);
          } else {
            setRecoveryError(true);
          }
        } catch (error) {
          console.error("Error recovery pass", error);
        }
      } else {
        setRecoveryError(true);
      }
    } else {
      // Обновляем состояние ошибок
      setErrors(newErrors);
    }
  };

  return (
    <div className="relative mx-auto mb-2 flex w-80 flex-col items-center pl-3 font-light ">
      <form onSubmit={handleSubmit}>
        <Image
          src={"/assets/icons/lock_ico.svg"}
          alt="lock icon"
          width={20}
          height={20}
          className="absolute left-4 top-0 translate-y-7"
        />
        <label
          htmlFor="password"
          className="block text-start text-sm text-medium_grey"
        >
          Enter new password
          <span className="text-xs"> (at least 6 characters)</span>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          pattern="^.{6,}$"
          value={formData.password}
          onChange={handleChange}
          className="mb-4 mt-1 block w-80 appearance-none rounded-lg border-transparent bg-base_grey py-0 pl-8 focus:border-transparent focus:outline-1 focus:ring-0 sm:w-80"
          required
        />
        {errors.password && (
          <p className="mt-2 text-center text-xs font-light text-red-500">
            {errors.password}
          </p>
        )}
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
      <div className="mb-2 flex flex-col items-center text-center md:mb-2">
        <h2
          className={`${
            recoveryError ? "visible" : "invisible"
          } mb-2 font-light text-red-500 md:mb-2`}
        >
          Oops... Something wetn wrong :(( <br /> Try again restore password.
        </h2>
      </div>
      <div className="traslate-y-6 mb-2 flex flex-col items-center text-center md:mb-2">
        <h2
          className={`${
            recovered ? "visible" : "invisible"
          } mb-2 font-light text-base_green md:mb-2`}
        >
          Password has been recovered succsessfuly!
        </h2>
      </div>
    </div>
  );
}
