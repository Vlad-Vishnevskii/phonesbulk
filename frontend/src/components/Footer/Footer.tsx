import Image from "next/image";
import Link from "next/link";

import { FooterProps } from "@/types/footer";

export default function Footer({ style, content }: FooterProps) {
  const { information, custumerservice, contactus } = content;

  const menuFormat =
    "text-sm font-light text-ligth_grey cursor-pointer hover:text-acsent_orange hover:underline sm:text-xs";
  const titleFormat = "mb-2 font-bold text-light_green sm:text-xs";
  return (
    <div className={`absolute bottom-0 w-full ${style} `}>
      <footer className="container flex w-full flex-col items-center justify-end">
        <div className="flex h-[100px] w-full items-center rounded-t-2xl bg-dark_grey sm:h-[72px]">
          <div className="mr-64 pl-40 xl:mr-16 lg:pl-8 md:hidden">
            <Image
              src={"/assets/images/logo.svg"}
              width={200}
              height={150}
              alt="phonesbulk Logo"
              sizes="100vw"
              className="max-w-[100vw]"
            />
            {/* <Logo /> */}
          </div>
          <div className="flex w-full items-start gap-20 self-start pt-3 lg:gap-12 md:justify-evenly sm:gap-3 sm:px-2 sm:pt-2">
            <div className="flex flex-col">
              <p className={titleFormat}>Information</p>
              {information.map(item => (
                <Link
                  key={item.id}
                  className={`${menuFormat}`}
                  href={item.link}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="flex flex-col">
              <p className={titleFormat}>Customer Service</p>
              {custumerservice.map(item => (
                <Link
                  key={item.id}
                  className={`${menuFormat}`}
                  href={item.link}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="flex flex-col">
              <p className={titleFormat}>Contact us</p>
              <div className="flex justify-between gap-4 sm:gap-2">
                {contactus.map(contact => (
                  <Link
                    href={contact.link}
                    key={contact.id}
                  >
                    <Image
                      src={
                        (process.env.NEXT_STRAPI_URL || "") +
                        contact.img?.data.attributes.url
                      }
                      width={24}
                      height={24}
                      alt="whatsap"
                      className="cursor-pointer"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto flex h-7 w-full items-center bg-black text-medium_grey sm:h-5">
          <p className="pl-40 text-sm font-light lg:pl-8 sm:pl-4 sm:text-xs">
            Copyright. All rights reserved. © 2024
          </p>
        </div>
      </footer>
    </div>
  );
}
