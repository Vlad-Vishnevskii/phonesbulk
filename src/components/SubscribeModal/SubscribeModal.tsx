"use client";

import { useState, useEffect } from "react";
import Modal from "@/ui/Modal/Modal";
import Link from "next/link";

type SubscribeModalProps = {
  title: string;
  btnText: string;
  link: string;
};

export const SubscribeModal = ({ title = 'Join our WhatsApp group for stock updates', btnText = 'Join', link }: SubscribeModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const openModal: () => void = () => {
    setIsModalOpen(true);
  };

  const closeModal: () => void = () => {
    setIsModalOpen(false);
  };

  useEffect(()=> {
    const hasSeenModal = sessionStorage.getItem('modal-shown');

    if (!hasSeenModal) {
        setTimeout(()=> {
            openModal()
            sessionStorage.setItem('modal-shown', 'true');  
        }, 3000)        
    }
  }, [])

  if (!link || !isModalOpen) {
    return null
  }

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        classname="text-white p-7 flex flex-col items-center min-h-[50px] sm:w-[90%]"
      >
        <button onClick={closeModal} className="absolute right-2 top-2">
            <svg width="25" height="25" viewBox="0 0 32 32"><path fill="currentColor" d="M17.414 16L24 9.414L22.586 8L16 14.586L9.414 8L8 9.414L14.586 16L8 22.586L9.414 24L16 17.414L22.586 24L24 22.586z"/></svg>
        </button>
        <h3 className="text-[22px] text-center">
            {title}
        </h3>
        
        <Link href={link} className="inline-flex rounded-lg bg-acsent_orange text-white px-4 py-2 mt-4 mb-3 font-bold md:flex justify-center w-full max-w-[293px]">
            {btnText}
        </Link>
      </Modal>
    </>
  );
};
