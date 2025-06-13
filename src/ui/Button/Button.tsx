interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  style?: string;
  type?: "button" | "submit" | "reset";
  arrowPosition?: "left" | "right"; // Добавлено для управления позицией стрелки
  flipArrow?: boolean; // Добавлено для переворачивания стрелки
  icon?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  style,
  type = "button",
  arrowPosition = "left", // Значение по умолчанию
  flipArrow = false, // Значение по умолчанию
  icon = false,
  disabled = false,
}) => {
  const arrowStyles = flipArrow ? { transform: "rotate(180deg)" } : {};
  // Размещаем стрелку в зависимости от arrowPosition
  const arrow = (
    <svg
      className="sm:w-3"
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={arrowStyles}
    >
      <path
        d="M14 11H8V15L1 8L8 1V5H14V11Z"
        stroke="#F2F2F2"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  return (
    <button
      onClick={onClick}
      type={type}
      className={`rounded-lg font-black leading-none ${style ? style : ""}`}
      disabled={disabled}
    >
      {icon && (
        <span className="mr-auto">{arrowPosition === "left" && arrow}</span>
      )}
      {children}
      {icon && (
        <span className="ml-auto">{arrowPosition === "right" && arrow}</span>
      )}
    </button>
  );
};
