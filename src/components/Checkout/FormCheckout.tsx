import Image from "next/image";
import { useState } from "react";

import { Button } from "@/ui/Button/Button";

import { useAuthStore, useCartStore } from "@/store/store";

import { FormDataCheckout } from "@/types/forms";

import { InputCustom } from "./InputCustom";
import { sendTelegram } from "@/app/actions";
import { getTokenFromLocalCookie } from "@/lib/auth";

export const FormCheckout = ({ setCurrentIndex }: { setCurrentIndex: any }) => {
  const { cart, clearCart } = useCartStore();
  const { id } = useAuthStore();
  const allSumm = cart.reduce(
    (acc, curr) => acc + (curr.quantity || 0) * curr.attributes.price,
    0,
  );
  const [visibleComponent, setVisibleComponent] = useState(true);
  const [isEmpty, setisEmpty] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [respStatus, setRespStatus] = useState("");
  const [formData, setFormData] = useState<FormDataCheckout>({
    email: "",
    userId: id,
    name: "",
    surname: "",
    company: "",
    designation: "",
    phone: "",
    whatsap: "",
    country: "",
    address1: "",
    address2: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isFormComplete = () => {
    const { ...fieldsToCheck } = formData;
    return Object.values(fieldsToCheck).every(value => {
      if (typeof value === "string") {
        return value.trim() !== "";
      }
      return true;
    });
  };

  const handleNext = () => {
    if (isFormComplete()) {
      setCurrentIndex(2);
      setIsFinal(true);
      setVisibleComponent(false);
    } else {
      setisEmpty(true);
    }
  };

  const bodyContent = {
    data: {
      email: formData.email,
      country: formData.country,
      address1: formData.address1,
      address2: formData.address1,
      designation: formData.designation,
      phone: formData.phone,
      name: formData.name,
      surname: formData.surname,
      whatsap: formData.whatsap,
      company: formData.company,
      products: cart.map(item => {
        return { model: item.attributes.model, quantity: item.quantity };
      }),
      summation: allSumm,
      users_permissions_user: { id: formData.userId },
    },
  };

  const handleSubmit = async () => {
    const token = await getTokenFromLocalCookie();
    if (!token) {
      setRespStatus("error");
      return;
    } else {
      try {
        setIsLoading(true);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/orders/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(bodyContent),
          },
        );

        const data = await response.json();

        if (response.status === 200) {
          setRespStatus("success");
          await sendTelegram(data, token);
          clearCart();
          setTimeout(() => {
            setCurrentIndex(0);
          }, 10000);
        } else {
          setRespStatus("error");
        }
        setIsLoading(false);
      } catch (error) {
        console.log("Sending order error", error);
      }
    }
  };

  return (
    <>
      {visibleComponent && (
        <form
          action=""
          className="mx-auto mt-3 flex w-[520px] flex-wrap items-center justify-between sm:w-96 sm:justify-evenly"
        >
          <InputCustom
            label="Name"
            iconName="user"
            onChange={handleInputChange}
            value={formData.name}
            isEmpty={isEmpty}
          />
          <InputCustom
            label="Surname"
            iconName="user"
            onChange={handleInputChange}
            value={formData.surname}
            isEmpty={isEmpty}
          />
          <InputCustom
            label="Company"
            iconName="company"
            onChange={handleInputChange}
            value={formData.company}
            isEmpty={isEmpty}
          />
          <InputCustom
            label="Designation"
            iconName="designation"
            onChange={handleInputChange}
            value={formData.designation}
            isEmpty={isEmpty}
          />
          <InputCustom
            label="Phone"
            iconName="phone"
            onChange={handleInputChange}
            value={formData.phone}
            isEmpty={isEmpty}
          />
          <InputCustom
            label="Email"
            iconName="email"
            onChange={handleInputChange}
            value={formData.email}
            isEmpty={isEmpty}
          />
          <InputCustom
            label="Whatsap"
            iconName="whatsap"
            onChange={handleInputChange}
            value={formData.whatsap}
            isEmpty={isEmpty}
          />
          <InputCustom
            label="Country"
            iconName="sphere"
            onChange={handleInputChange}
            value={formData.country}
            isEmpty={isEmpty}
          />
          <InputCustom
            label="Address 1"
            iconName="house"
            onChange={handleInputChange}
            value={formData.address1}
            isEmpty={isEmpty}
          />
          <InputCustom
            label="Address 2"
            iconName="house"
            onChange={handleInputChange}
            value={formData.address2}
            isEmpty={isEmpty}
          />
        </form>
      )}
      {respStatus === "success" && (
        <p className="mt-5 text-center text-2xl font-bold text-base_green md:text-base">
          Your order has been successfully created and you will be contacted
          soon
        </p>
      )}
      <div className="mb-1 mt-10 flex  justify-center sm:mt-10">
        <div className="flex gap-24 sm:gap-2">
          {visibleComponent && (
            <>
              <Button
                style="bg-acsent_orange text-white text-base sm:text-xs py-2 px-2 w-[250px] sm:w-[150px] flex items-center hover:bg-active_orange sm:py-1"
                arrowPosition="left"
                icon={true}
                onClick={() => setCurrentIndex(0)}
              >
                Previous
              </Button>

              <Button
                style="bg-base_green text-white text-base sm:text-xs py-2 px-2 w-[250px] sm:w-[150px] flex items-center justify-center hover:bg-dark_green sm:py-1"
                arrowPosition="right"
                flipArrow
                icon={true}
                onClick={handleNext}
              >
                Next
              </Button>
            </>
          )}
          {isFinal && (
            <Button
              type="submit"
              style="relative h-8 bg-base_green text-white text-base sm:text-xs py-2 px-2 w-[250px] sm:w-[150px] flex items-center justify-center hover:bg-dark_green disabled:bg-light_green"
              arrowPosition="right"
              flipArrow
              icon={false}
              onClick={handleSubmit}
              disabled={respStatus === "success"}
            >
              {isLoading ? (
                <Image
                  alt="loading"
                  src={"/assets/images/loader.svg"}
                  quality={80}
                  width={30}
                  height={30}
                  style={{
                    margin: "0 auto",
                    position: "absolute",
                  }}
                />
              ) : (
                "Send order"
              )}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
