import ColoredText from "./ColoredText";

export const Advantage = ({
  content,
  sizeText = "22",
}: {
  content: any;
  sizeText?: string;
}) => {
  const styles = { fontSize: `${sizeText}px` };
  return (
    <div className=" w-[373px] sm:w-[290px] sm:pb-2 sm:pt-4">
      <div className="rounded-t-[20px] bg-base_green py-1 text-center text-xl font-black text-white md:text-base">
        {content.title}
      </div>
      <div
        className="h-[90%] rounded-b-[20px] bg-white  pl-8 pr-4 pt-5 font-light sm:pb-2 sm:pt-2 sm:leading-none"
        style={styles}
      >
        <ul className="leading-6 sm:leading-tight">
          {content.desc.map((item: any) => (
            <li
              className="mb-2 list-disc lg:text-sm md:text-xs sm:mb-1 sm:text-[10px]"
              key={item.id}
            >
              <ColoredText text={item.description} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
