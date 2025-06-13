import { useCartStore } from "@/store/store";

import { ProductData } from "@/types/product";

import { CheckoutProduct } from "./CheckoutProduct";

export const StepOneCheckout = () => {
  const { cart } = useCartStore();

  const allSumm = cart.reduce(
    (acc, curr) => acc + (curr.quantity || 0) * curr.attributes.price,
    0,
  );

  return (
    <>
      <div className="mt-10 max-w-[100vw] sm:mt-2">
        <div className="table w-full border-separate border-spacing-y-[2px]">
          <div className="table-row-group">
            {cart.length > 0 ? (
              cart?.map((product: ProductData) => (
                <CheckoutProduct
                  product={product}
                  key={product.id}
                />
              ))
            ) : (
              <p className="text-center text-base_grey sm:text-sm">
                empty Cart
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="my-4 border-t-2 border-medium_grey"></div>
      <div className="flex justify-end">
        <div className="text-lg font-black sm:text-sm ">TOTAL:</div>
        <div className="mx-5 text-lg font-black sm:text-sm">{cart.length}</div>
        <div className="mr-5 text-lg font-black sm:text-sm">
          ${allSumm.toLocaleString("en-US")}
        </div>
      </div>
    </>
  );
};
