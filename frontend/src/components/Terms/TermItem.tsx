import Image from "next/image";

export const TermItem = ({ content }: { content: any }) => {
  const imageUrl =
    process.env.NEXT_STRAPI_URL + content.icon.data.attributes.url;

  return (
    <div className="mb-6 flex gap-5">
      <div className="min-w-9">
        <Image
          src={imageUrl}
          width={30}
          height={30}
          alt="icon"
        />
      </div>
      <div className="max-w-[730px] text-2xl font-light lg:text-base md:text-sm sm:text-xs">
        <span className="font-bold text-dark_green">{content.title + " "}</span>
        {content.description}
      </div>
    </div>
  );
};
