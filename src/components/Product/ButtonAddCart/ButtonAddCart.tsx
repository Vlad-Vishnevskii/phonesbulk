interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  style?: string;
  type?: "button" | "submit" | "reset";
  exists: boolean;
}

export const ButtonAddCart: React.FC<ButtonProps> = ({
  children,
  onClick,
  style,
  type = "button",
  exists,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`flex w-[121px] items-center gap-2 rounded-xl md:max-w-[64px] ${exists ? "bg-light_green text-dark_grey" : "bg-dark_green text-white"} px-2 py-1 font-black  group-hover:bg-light_green group-hover:text-dark_grey md:rounded-md sm:text-[7px] ${style}`}
    >
      <svg
        width="23"
        height="22"
        viewBox="0 0 23 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={` group-hover:stroke-[#000000] ${exists ? "stroke-black" : "stroke-white"} md:h-4 md:w-4`}
      >
        <path
          d="M6.94995 21C7.50224 21 7.94995 20.5523 7.94995 20C7.94995 19.4477 7.50224 19 6.94995 19C6.39767 19 5.94995 19.4477 5.94995 20C5.94995 20.5523 6.39767 21 6.94995 21Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.95 21C18.5022 21 18.95 20.5523 18.95 20C18.95 19.4477 18.5022 19 17.95 19C17.3977 19 16.95 19.4477 16.95 20C16.95 20.5523 17.3977 21 17.95 21Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 1.04999H3L5.66 13.47C5.75758 13.9248 6.01067 14.3315 6.37571 14.6198C6.74075 14.9082 7.19491 15.0603 7.66 15.05H17.44C17.8952 15.0493 18.3365 14.8933 18.691 14.6078C19.0456 14.3224 19.2921 13.9245 19.39 13.48L21.04 6.04999H4.07"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className="inline md:hidden">{children}</span>
      <span className="hidden text-xs md:inline">Add</span>
    </button>
  );
};
