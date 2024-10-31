import { FaqItem } from "./FaqItem";

export const Faq = ({ content }: { content: any }) => {
  return (
    <section
      id="faq"
      className="bg-base_grey px-10 py-8 sm:px-9 sm:py-5"
    >
      <h2 className="header_h2 mb-3">{content.title}</h2>
      <div className="flex flex-wrap justify-between gap-y-6 rounded-[20px] p-7 sm:justify-center sm:gap-y-2 sm:border-none sm:p-0">
        {content.faqitem.map((item: any) => (
          <FaqItem
            content={item}
            key={item.id}
          />
        ))}
      </div>
    </section>
  );
};
