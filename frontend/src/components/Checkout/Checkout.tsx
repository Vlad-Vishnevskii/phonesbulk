"use client";

import { useRouter } from "next/navigation";
import { FC, useState } from "react";

import { Button } from "@/ui/Button/Button";

import { useCartStore } from "@/store/store";

import { CheckoutNumber } from "./CheckoutNumber";
import { Dashed } from "./Dashed";
import { FormCheckout } from "./FormCheckout";
import { StepOneCheckout } from "./StepOneCheckout";
import withAuth from "@/lib/hoc/withAuth";

const Text1Component = () => {
  return (
    <p className="mb-4 text-medium_grey lg:text-sm lg:leading-3 sm:text-xs">
      Have you forgotten anything? If order OK click Next
    </p>
  );
};
const Text2Component = () => {
  return (
    <p className="mb-4 text-medium_grey lg:text-sm lg:leading-3 sm:text-xs">
      Now, carefully fill out and check the shipping information,{" "}
      <br className="hidden md:block" /> then click Next
    </p>
  );
};
const Text3Component = () => {
  return (
    <>
      <p className="mb-4 text-base font-bold text-base_green">Final step </p>
      <p className="mb-4 text-medium_grey lg:text-sm lg:leading-3 sm:text-xs">
        Click Send order and our manager will contact you{" "}
        <br className="hidden md:block" /> as soon as possible to clarify the
        details of payment <br className="hidden md:block" /> and delivery of
        goods.
      </p>
    </>
  );
};

const CheckoutComponent: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { cart } = useCartStore();

  const router = useRouter();
  // Массив компонентов
  const componentsArray = [
    <StepOneCheckout key="step-one" />,
    <FormCheckout
      key="form-one"
      setCurrentIndex={setCurrentIndex}
    />,
  ];

  // Функция для перехода к следующему компоненту
  const handleNext = () => {

    if (cart.length === 0) {
      return;
    }
    setCurrentIndex(1);
  };

  // Функция для возвращения к предыдущему компоненту
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    if (currentIndex < 1) router.push("/shop");
  };

  return (
    <div className="mx-16 pt-7 lg:mx-6 md:pt-16 sm:mx-1 sm:pt-8">
      <h2 className="text-[30px] font-black text-dark_green sm:mt-2 sm:text-center sm:text-[20px]">
        Checkout
      </h2>
      <div className="mx-14 mt-16 flex items-center justify-around sm:mx-12 sm:mt-12">
        <CheckoutNumber
          number={1}
          active={currentIndex === 0 ? true : false}
          title="Verify your order"
          titleSm="Verify order"
        />
        <Dashed style="ml-1" />
        <CheckoutNumber
          number={2}
          active={currentIndex === 1 ? true : false}
          title="Fill delivery information"
        />
        <Dashed />
        <CheckoutNumber
          number={3}
          active={currentIndex === 2 ? true : false}
          title="Send order to us"
        />
      </div>
      <div className="mt-5">
        <div className="text-center text-lg text-dark_grey sm:text-[10px]">
          {currentIndex === 0 && <Text1Component />}
          {currentIndex === 1 && <Text2Component />}
          {currentIndex === 2 && <Text3Component />}
        </div>
      </div>
      {currentIndex === 2 ? componentsArray[1] : componentsArray[currentIndex]}
      <div className="mb-5 mt-24 flex  justify-center sm:mt-10">
        <div className="flex gap-24 sm:gap-2">
          {currentIndex < 1 && (
            <Button
              style="bg-acsent_orange text-white text-base sm:text-xs py-2 px-2 w-[250px] sm:w-[150px] flex items-center hover:bg-active_orange md:py-1 "
              arrowPosition="left"
              icon={true}
              onClick={handlePrevious}
            >
              {currentIndex > 0 ? "Previous" : "Continue Shopping"}
            </Button>
          )}
          {currentIndex < 1 && (
            <Button
              style="bg-base_green text-white text-base sm:text-xs py-2 px-2 w-[250px] sm:w-[150px] flex items-center justify-center hover:bg-dark_green md:py-1 disabled:bg-light_green"
              arrowPosition="right"
              flipArrow
              disabled={cart.length === 0}
              icon={currentIndex > 1 ? false : true}
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export const Checkout = withAuth(CheckoutComponent);
