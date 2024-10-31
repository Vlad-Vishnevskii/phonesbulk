import {
  iconAccount,
  iconBank,
  iconCompany,
  iconDesignation,
  iconEmail,
  iconHouse,
  iconPhone,
  iconRecipient,
  iconSphere,
  iconUser,
  iconWhatsap,
} from "@/lib/svg";

const icons = {
  sphere: iconSphere,
  house: iconHouse,
  bank: iconBank,
  recipient: iconRecipient,
  account: iconAccount,
  designation: iconDesignation,
  phone: iconPhone,
  user: iconUser,
  whatsap: iconWhatsap,
  email: iconEmail,
  company: iconCompany,
};

interface InputCustomProps {
  label: string;
  iconName:
    | "account"
    | "sphere"
    | "house"
    | "bank"
    | "recipient"
    | "designation"
    | "phone"
    | "user"
    | "whatsap"
    | "email"
    | "company";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string;
  isEmpty?: boolean;
}

export const InputCustom: React.FC<InputCustomProps> = ({
  label,
  iconName,
  onChange,
  name,
  value,
  isEmpty,
}) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={label.toLowerCase()}
        className="mb-1 block text-sm font-light text-medium_grey md:mb-0 md:text-xs"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          id={label.toLowerCase()}
          name={label.toLowerCase().replaceAll(" ", "")}
          style={{ outline: "none" }}
          className=" block w-64 appearance-none rounded-lg border-none border-transparent bg-ligth_grey pl-10 text-sm leading-none text-gray-900 outline-none placeholder:text-acsent_red  focus:border-transparent focus:outline-none focus:ring-0 sm:mb-2 sm:w-44 sm:pl-8 sm:text-[10px]"
          onChange={onChange}
          placeholder={isEmpty ? "Please fill out this field" : ""}
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 sm:size-7  sm:pl-1">
          {icons[iconName]}
        </div>
      </div>
    </div>
  );
};
