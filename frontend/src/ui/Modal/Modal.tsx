"use client";

import { ReactNode, useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeModalOnOutsideClick = (e: Event) => {
      if (
        e instanceof MouseEvent &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    const handleClickOutside = (e: Event) => {
      if (isOpen) {
        closeModalOnOutsideClick(e);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-30 flex h-screen w-full items-center justify-center">
      <div className="absolute left-0 top-0 z-30 h-screen w-full bg-black/30 "></div>
      <div
        className="relative z-50 mt-10 min-h-[516px] w-[460px] overflow-hidden rounded-2xl bg-dark_grey shadow-lg sm:w-[95%]"
        ref={modalRef}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
