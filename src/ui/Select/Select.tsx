import { SelectType } from "@/types/select";

export const Select = ({
  options,
  handle,
}: {
  options: SelectType[];
  handle: any;
}) => {
  return (
    <div className="relative">
      <select
        className="appearance-none rounded-lg border bg-base_grey py-1 pl-4 pr-10 leading-tight focus:appearance-none focus:border-transparent focus:ring-0 sm:pl-1 sm:pr-5 sm:text-[9px]"
        onChange={e => handle("", e.target.value)}
      >
        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
