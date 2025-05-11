import Image from "next/image";
import Link from "next/link";

import { Button } from "@/ui/Button/Button";

interface Attributes {
  url: string;
}

interface BgProps {
  data: {
    attributes: Attributes;
  };
}
interface TextType {
  [key: string]: string;
}

export default function Hero({
  bg,
  text,
  buttonText,
  subscribeLink,
}: {
  bg: BgProps;
  text: TextType;
  buttonText: string;
  subscribeLink: string;
}) {
  const bgUrl = `url(${process.env.NEXT_STRAPI_URL + bg.data.attributes.url})`;

  return (
    <section className="h-screen max-h-[784px] w-full">
      <div
        className="hero_bg"
        style={{ backgroundImage: bgUrl }}
      ></div>
      <div className="hero_wrapper">
        <div className="hero_text w-[50%+100px] xl:w-full sm:w-full">
          {text.line1 && <p>{text.line1}</p>}
          {text.line2 && (
            <p>
              <span className="hero_text_acsent">{text.line2}</span>
            </p>
          )}
          {text.line3 && <p>{text.line3}</p>}
        </div>
        <Link
          href="/shop"
        >
          <Button style={"btn_shop"}>{buttonText}</Button>
        </Link>
        {subscribeLink &&
          <Link
            href={subscribeLink}
            className="mt-4"
          >
            <Button style={"btn_shop"}>Subscribe for updates</Button>
          </Link>
        }
        <Link
          href="#company"
          className="z-10 mx-auto mt-auto animate-bounce cursor-pointer sm:mb-8"
        >
          <Image
            src={"/assets/images/arrow_down_img.svg"}
            width={20}
            height={20}
            alt="arrow_down"
            className="text- z-10 mx-auto mt-auto animate-bounce cursor-pointer sm:mb-8"
          />
        </Link>
      </div>
    </section>
  );
}
