import { Advantage } from "./Advantage";

export const OurCompany = ({ content }: { content: any }) => {
  return (
    <div
      id="company"
      className=" bg-ligth_grey p-10 lg:px-4 md:py-5 sm:px-9"
    >
      <h2 className="header_h2 sm:hidden">{content.title}</h2>
      <p className="w-2/3 text-sm font-light text-dark_grey lg:w-full lg:text-xs sm:hidden">
        {content.maintext}
      </p>
      <div className="mt-6 flex items-stretch justify-evenly gap-3 sm:mt-4 sm:flex-col sm:items-center">
        {content &&
          content.adventage.map((item: any) => (
            <Advantage
              content={item}
              sizeText={item.id === 2 ? "18" : "18"}
              key={item.id}
            />
          ))}
      </div>
    </div>
  );
};
