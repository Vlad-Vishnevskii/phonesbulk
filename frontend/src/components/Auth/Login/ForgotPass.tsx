import { FC } from "react";

import { Button } from "@/ui/Button/Button";

import { SwitchFormProps } from "@/types/forms";

export const ForgotPass: FC<Pick<SwitchFormProps, "switchForm">> = ({
  switchForm,
}) => {
  return (
    <Button
      style="hover:underline hover:underline-offset-2 text-light_green font-extralight mb-2"
      onClick={() => switchForm("restore")}
    >
      Forgot password?
    </Button>
  );
};
