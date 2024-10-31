"use client";

import Image from "next/image";
import { useState } from "react";

import Logo from "@/components/Logo/logo";

import { Button } from "@/ui/Button/Button";
import Modal from "@/ui/Modal/Modal";

import { useAuthStore } from "@/store/store";

import { useAuthCheck } from "@/hooks/useAuthCheck";

import LoginForm from "../Auth/Login/LoginForm";
import { RestorePass } from "../Auth/Login/RestorePass";
import RegForm from "../Auth/RegForm/RegForm";
import { SucceessReg } from "../Auth/RegForm/SuccessReg";
import { Cart } from "../Cart/Cart";

import { AvatarMenu } from "./AvatarMenu/AvatarMenu";

export const CartLoginComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoginForm, setIsLoginForm] = useState<string>("login");
  const { auth, login } = useAuthStore();

  useAuthCheck();

  const handleSwitchForm = (mode: string) => {
    setIsLoginForm(mode);
  };

  const openModal: () => void = () => {
    setIsModalOpen(true);
  };

  const closeModal: () => void = () => {
    setIsModalOpen(false);
  };

  const handleLoginBtn: () => void = () => {
    setIsLoginForm("login");
    setIsModalOpen(true);
  };

  return (
    <>
      <Cart onOpen={openModal} />
      {!auth ? (
        <Button
          style={"btn_login"}
          onClick={handleLoginBtn}
        >
          Login
        </Button>
      ) : (
        <AvatarMenu />
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <div className="z-50 flex h-10 w-full items-center bg-light_green pl-4">
          <Logo style={"size-40"} />
        </div>
        {isLoginForm === "login" && (
          <LoginForm
            switchForm={handleSwitchForm}
            login={login}
            onClose={closeModal}
          />
        )}
        {isLoginForm === "register" && (
          <RegForm switchForm={handleSwitchForm} />
        )}
        {isLoginForm === "restore" && (
          <RestorePass switchForm={handleSwitchForm} />
        )}
        {isLoginForm === "congrat" && (
          <SucceessReg switchForm={handleSwitchForm} />
        )}

        <div className="absolute bottom-0 left-0 right-0 h-20 w-full">
          <Image
            src="/assets/images/footer_login_img.jpg"
            fill={true}
            alt="your parcel"
            className=""
          />
        </div>
      </Modal>
    </>
  );
};
