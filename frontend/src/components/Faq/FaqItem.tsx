"use client";

import { useState } from "react";

interface FaqTypes {
  question: string;
  answer: string;
}
export const FaqItem = ({ content }: { content: FaqTypes }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <div className=" flex w-[497px] justify-between rounded-[10px] bg-dark_grey py-3 pl-6 pr-[18px] text-base font-black text-white sm:w-[304px] sm:px-3 sm:pb-3 sm:pt-2 sm:text-xs">
        {content.question}
        <div
          className="flex size-6 cursor-pointer items-center justify-center rounded-full border-[3px] border-acsent_orange bg-dark_grey font-black leading-none text-white sm:size-[17px] sm:border-2"
          onClick={handleClick}
        >
          {open ? "-" : "+"}
        </div>
      </div>

      <div
        className={`${open ? "visible" : "hidden"} w-[497px] -translate-y-3 rounded-b-[10px] bg-dark_grey py-[22px] pl-6 pr-[18px] text-sm font-light text-white sm:w-[304px] sm:-translate-y-[17px] sm:px-4 sm:py-2 sm:text-xs`}
      >
        {content.answer}
      </div>
    </>
  );
};
