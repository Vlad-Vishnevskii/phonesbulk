import { Contacts } from "@/components/ContactUs/Contacts";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import { Navbar } from "@/components/Navbar/Navbar";
import { OurCompany } from "@/components/OurCompany/OurCompany";
import { Terms } from "@/components/Terms/Terms";
import WhatsAppCall from "@/components/WhatsapCall/WhatsAppCall";

// import { SubscribeModal } from "@/components/SubscribeModal/SubscribeModal";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/mac-book-page?populate[content][populate][menuitem][populate]=*&populate[content][populate][background][populate]=*&populate[content][populate][information][populate]=*&populate[content][populate][custumerservice][populate]=*&populate[content][populate][contactus][populate]=*&populate[content][populate][adventage][populate]=*&populate[content][populate][tcitem][populate]=*&populate[content][populate][image][populate]=*&populate[content][populate][faqitem][populate]=*`,
    {
      cache: "no-store", // Отключение кэширования
    },
  );

  return res.json();
}

export default async function MacBook() {
  const page = await getData();
  const data = page.data;
  const content = data.attributes.content;
  const textToHero = {
    line1: content[1].hero_line1,
    line2: content[1].hero_line2,
    line3: content[1].hero_line3,
  };

  return (
    <>
      <header>
        <Navbar linksall={content[0].menuitem} />
      </header>
      <main className="w-full">
        <Hero
          bg={content[1].background}
          text={textToHero}
          buttonText={content[1].buttontext}
          subscribeText={content[1].subscribeText}
          subscribeLink={content[1].subscribeLink}
        />
        <OurCompany content={content[2]} />
        <Terms content={content[3]} />
        <Contacts content={content[5]} />
        <WhatsAppCall whatsAppLink={content[5].contactus[0].link} />
      </main>
      <Footer
        style="block"
        content={content[5]}
      />
      {/* <SubscribeModal link={content[1].modalSubscribeBtnLink} btnText={content[1].modalSubscribeBtnText} title={content[1].modalSubscribeTitle}/>       */}
    </>
  );
}
