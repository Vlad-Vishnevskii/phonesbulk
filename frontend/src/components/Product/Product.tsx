"use client";

import Image from "next/image";
import { useState } from "react";

import { ButtonAddCart } from "@/components/Product/ButtonAddCart/ButtonAddCart";

import { Counter } from "@/ui/Counter/Counter";

import { useCartStore } from "@/store/store";

import { ProductData } from "@/types/product";

export const Product = ({ product }: { product: ProductData }) => {
  const [productCopy, setProductCopy] = useState({ ...product, quantity: 30 });

  const { cart, addToCart } = useCartStore();
  const exists = cart.some(item => item.id === product.id);

  const handleQuantityChange = (newQuantity: number) => {
    const updatedProduct = { ...productCopy, quantity: newQuantity };
    setProductCopy(updatedProduct);
  };
  const handleAddToCart = (product: ProductData) => {
    addToCart(product);
  };
  return (
    <>
      <div className="delay-70  table-row w-full sm:text-[7px]">
        <div className=" group flex w-full justify-between rounded-xl bg-ligth_grey hover:bg-dark_green sm:rounded-md">
          <div className="flex w-full items-center">
            <div className="table-cell max-w-[550px] p-1 group-hover:text-white sm:w-[160px] sm:text-[9px] ">
              {product.attributes.model}
            </div>
          </div>
          <div className="flex items-center">
            <div className="table-cell w-20 border-separate border-none sm:max-w-6">
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

            <div
              className="table-cell w-20 text-center font-black group-hover:text-white md:max-w-14 md:text-xs sm:max-w-10 sm:text-[8px]"
              //align="center"
            >
              ${product.attributes.price.toLocaleString("en-US")}
            </div>
            <div
              className="table-cell w-20 text-center font-black group-hover:text-white md:max-w-14 md:text-xs sm:max-w-10 sm:text-[8px]"
              //align="center"
            >
              Qty {product.attributes.qty}
            </div>
            <div className="table-cell w-20 sm:max-w-14">
              <Counter
                quantity={productCopy.quantity}
                handleQuantityChange={handleQuantityChange}
                productId={productCopy.id}
              />
            </div>
            <div className="table-cell max-w-40 p-1 ">
              <div className="flex justify-center">
                <ButtonAddCart
                  exists={exists}
                  onClick={() => handleAddToCart(productCopy)}
                >
                  {exists ? "in Cart" : "Add Cart"}
                </ButtonAddCart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
