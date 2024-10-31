import { FC } from "react";

import { SwitchFormProps } from "@/types/forms";

export const SucceessReg: FC<Pick<SwitchFormProps, "switchForm">> = () => {
  return (
    <>
      <div className="flex h-full flex-grow  items-center justify-center">
        <div className="mb-3 mt-10 flex h-full w-full flex-col items-center justify-center pl-6 pr-4 sm:pl-2">
          <div className="text-lg font-black text-acsent_orange">
            Congratulation!
          </div>
          <p className={`mb-36 pt-1 text-center font-light text-base_grey`}>
            You have been registered successfuly! <br /> Please, confirm email
            and come back to login.
          </p>
        </div>
      </div>
    </>
  );
};
