import { FC } from "react";

import { useCartStore } from "@/store/store";

interface CounterProps {
  quantity: number;
  handleQuantityChange: (newQuantity: number) => void;
  productId: number;
}

export const Counter: FC<CounterProps> = ({
  quantity,
  handleQuantityChange,
  productId,
}) => {
  const handlePlus = () => {
    handleQuantityChange(quantity + 30);
    updateQuantity(productId, "increase");
  };
  const handleMinus = () => {
    if (quantity >= 60) handleQuantityChange(quantity - 30);
    updateQuantity(productId, "decrease");
  };

  const { updateQuantity } = useCartStore();

  return (
    <div className="flex items-center justify-center gap-1 ">
      <button
        className="flex h-4 w-4 items-center justify-center rounded-full bg-base_grey p-1"
        onClick={handleMinus}
      >
        -
      </button>
      <div>
        <input
          type="text"
          className="h-10 w-10 rounded-md border-none p-1 text-center text-xs font-black outline-none sm:h-5 sm:w-5 sm:p-1 sm:text-[7px]"
          value={quantity}
          readOnly
        />
      </div>
      <button
        className="flex h-4 w-4 items-center justify-center rounded-full bg-base_grey p-1"
        onClick={handlePlus}
      >
        +
      </button>
    </div>
  );
};
