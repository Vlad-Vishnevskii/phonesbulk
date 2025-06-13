"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type WhatsAppCallProps = {
  whatsAppLink: string;
};

const WhatsAppCall = ({ whatsAppLink }: WhatsAppCallProps) => {
  const [isLastScreen, setIsLastScreen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      setIsLastScreen(isBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 right-0 z-50 flex flex-col items-end mr-16 md:mr-5 ${isLastScreen ? "mb-32 sm:mb-24" : "mb-14 sm:mb-6"}`}
    >
      <Link
        href={whatsAppLink}
        target="_blank"
        className="mb-3"
      >
        <Image
          src={"/assets/images/whatsap_img.svg"}
          alt="whatsapp"
          width={36}
          height={36}
        />
      </Link>
    </div>
  );
};

export default WhatsAppCall;
