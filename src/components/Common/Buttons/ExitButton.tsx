import React from "react";
import { Button } from "@/components/ui/button";
import { useFormStepStore } from "@/store/useFormStepStore";

import Icons from "../Icons/Icons";
import useResetForm from "@/hooks/useResetForm";

interface ExitButtonProps {
  mode: "icon" | "regular";
}

const ExitButton = ({ mode }: ExitButtonProps) => {
  /* State */
  const { setFormStep } = useFormStepStore();
  const { resetFormState } = useResetForm();

  const onExitHandeller = () => {
    resetFormState();
    setFormStep(1);
  };

  return (
    <>
      {mode === "icon" && (
        <>
          <Button
            variant={"outline"}
            className="rounded-full hover:bg-slate-400 bg-transparent w-fit p-2 m-0 h-fit shadow-none"
            onClick={onExitHandeller}
          >
            <Icons type="close" color="black" size={20} />
          </Button>
        </>
      )}
      {mode === "regular" && (
        <>
          <Button
            onClick={onExitHandeller}
            className="bg-slate-700 text-white px-4 py-2 rounded-md hover:bg-slate-800 transition duration-300"
          >
            Go Back to the Beginning
          </Button>
        </>
      )}
    </>
  );
};

export default ExitButton;
