export const CheckoutNumber = ({
  number,
  active = false,
  title,
  titleSm = title,
}: {
  number: number;
  active?: boolean;
  title: string;
  titleSm?: string;
}) => {
  const styleOfStatus =
    "ring-2 ring-acsent_orange ring-offset-4 bg-acsent_orange";
  return (
    <div
      className={`relative flex min-h-[72px] min-w-[72px] items-center justify-center rounded-full text-[30px] font-black text-white  md:min-h-10 md:min-w-10 md:text-lg ${active ? styleOfStatus : "bg-medium_grey"}`}
    >
      <div className="absolute top-[-40px] w-[210px] text-center text-lg font-bold text-base_green md:text-sm sm:max-w-[100px] sm:text-xs">
        <span className="inline md:hidden">{title}</span>
        <span className="hidden md:inline">{titleSm}</span>
      </div>
      {number}
    </div>
  );
};
