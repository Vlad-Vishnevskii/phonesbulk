import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";

import { useAuthStore, useCartStore } from "@/store/store";

import { SwitchFormProps } from "@/types/forms";
import { ProductData } from "@/types/product";

export const Cart: FC<Pick<SwitchFormProps, "onOpen">> = ({ onOpen }) => {
  const { cart } = useCartStore();
  const { auth } = useAuthStore();
  const router = useRouter();

  const totalQuantity =
    cart.length > 0
      ? cart.reduce(
          (total, product: ProductData) => total + (product?.quantity || 0),
          0,
        )
      : 0;

  const handleCheckout: () => void = () => {
    if (auth) {
      router.push("/user/checkout");
    } else {
      onOpen();
    }
  };

  return (
    <div
      className="cart cursor-pointer"
      onClick={handleCheckout}
    >
      <Image
        src="/assets/icons/basket.svg"
        width={32}
        height={32}
        alt="cart"
        className="sm:h-6 sm:w-6"
      />
      <div className="cart_badge">{totalQuantity}</div>
    </div>
  );
};
