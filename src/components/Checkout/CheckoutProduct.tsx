"use client";

import Image from "next/image";
import { useState } from "react";

import { Counter } from "@/ui/Counter/Counter";

import { useCartStore } from "@/store/store";

import { ProductData } from "@/types/product";

export const CheckoutProduct = ({ product }: { product: ProductData }) => {
  const [productCopy, setProductCopy] = useState({ ...product, quantity: 30 });
  const handleQuantityChange = (newQuantity: number) => {
    const updatedProduct = { ...productCopy, quantity: newQuantity };
    setProductCopy(updatedProduct);
  };

  const { removeFromCart } = useCartStore();

  return (
    <div className="delay-70  table-row w-full sm:text-[7px]">
      <div className=" group flex justify-between rounded-xl bg-ligth_grey hover:bg-dark_green sm:rounded-md">
        <div className="flex flex-grow items-center">
          <div className="table-cell max-w-[550px] p-1 group-hover:text-white md:text-xs md:leading-3 sm:text-[9px] ">
            {product.attributes.model}
          </div>
        </div>
        <div className="flex items-center">
          <div className="table-cell w-20 border-separate border-none md:max-w-8 sm:max-w-6">
            <div className="flex w-12 justify-center gap-2 sm:w-8">
              {product.attributes.bestprice ? (
                <Image
                  src="/assets/icons/bestprice.svg"
                  width={15}
                  height={15}
                  alt="bestprice"
                />
              ) : (
                ""
              )}
              {product.attributes.bestseller ? (
                <Image
                  src="/assets/icons/bestseller.svg"
                  width={15}
                  height={15}
                  alt="bestseller"
                />
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="table-cell w-20 text-center font-black group-hover:text-white lg:max-w-16 lg:text-sm lg:leading-3 sm:max-w-10 sm:text-[8px]">
            ${product.attributes.price.toLocaleString("en-US")}
          </div>
          <div className="table-cell w-20 text-center font-black group-hover:text-white lg:max-w-16 lg:text-sm sm:max-w-10 sm:text-[8px]">
            Qty {product.attributes.qty}
          </div>
          <div className="table-cell w-20 sm:max-w-14">
            <Counter
              quantity={product.quantity || 0}
              handleQuantityChange={handleQuantityChange}
              productId={productCopy.id}
            />
          </div>
          <div className="table-cell w-24 px-4 font-black group-hover:text-white lg:max-w-16 lg:text-sm sm:max-w-10 sm:px-1 sm:text-[8px]">
            $
            {(productCopy.quantity * product.attributes.price).toLocaleString(
              "en-US",
            )}
          </div>
          <div className="table-cell max-w-40 p-1 md:max-w-10 md:p-0">
            <div className="flex justify-center pr-4 md:px-1">
              <button onClick={() => removeFromCart(product.id)}>
                <svg
                  className="stroke-medium_grey group-hover:stroke-white"
                  width="16"
                  height="16"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 5.5L5.5 16.5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.5 5.5L16.5 16.5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
