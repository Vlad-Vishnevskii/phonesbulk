import Image from "next/image";

export const Checkbox = ({
  best = "",
  handle,
}: {
  best: string;
  handle: any;
}) => {
  return (
    <div className="flex gap-2">
      <label className="inline-flex items-center">
        <input
          id={best}
          type="checkbox"
          className={`relative size-5 cursor-pointer appearance-none rounded-md border-transparent bg-base_grey text-base_grey outline-0 ring-0 ring-transparent ring-offset-0 checked:border-transparent checked:outline-0 checked:ring-0 checked:after:absolute checked:after:top-0 checked:after:h-full checked:after:w-full checked:after:bg-[url('/assets/icons/check.svg')] focus:border-transparent focus:outline-transparent focus:ring-0 focus:ring-transparent`}
          onChange={e => handle("", "best" + best + e.target.checked)}
        />
      </label>
      <div className="flex items-center gap-3 leading-none text-white sm:gap-2 sm:text-[9px]">
        {best === "price" && (
          <Image
            src="/assets/icons/bestprice.svg"
            width={16}
            height={16}
            alt="best"
          />
        )}
        {best === "seller" && (
          <Image
            src="/assets/icons/bestseller.svg"
            width={16}
            height={16}
            alt="seller"
          />
        )}
        {"Best " + best}
      </div>
    </div>
  );
};
