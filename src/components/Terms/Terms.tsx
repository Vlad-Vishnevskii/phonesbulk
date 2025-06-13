import Image from "next/image";

import { TermItem } from "./TermItem";

export const Terms = ({ content }: { content: any }) => {
  const imageUrl =
    process.env.NEXT_STRAPI_URL + content.image.data.attributes.url;

  return (
    <div
      id="terms"
      className="bg-ligth_grey px-10 pt-6 sm:px-9 sm:py-0"
    >
      <h2 className="header_h2 pt-11 md:pt-5">{content.title}</h2>
      <div className="mt-10 flex md:mt-4">
        <div className="mr-[50px] h-full w-fit rounded-[60px] bg-gradient-to-t from-white to-acsent_orange p-1 md:hidden">
          <Image
            className="rounded-[60px]"
            src={imageUrl}
            width={414}
            height={380}
            alt="Terms and conditions"
          />
        </div>

        <div>
          <ul>
            {content.tcitem.map((item: any) => (
              <TermItem
                content={item}
                key={item.id}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
