import React from "react";
import { Button } from "@/components/ui/button";
import { useFormStepStore } from "@/store/useFormStepStore";
import { useSelectionStore } from "@/store/useSelectionStore";
import Icons from "@/components/Common/Icons/Icons";

interface FormButtonsProps {
  condition: boolean;
  buttonTitle: string;
}

const FormButtons = ({ condition, buttonTitle }: FormButtonsProps) => {
  /* State */
  const { brokerSelection, setBrokerSelection, brokerIndex } =
    useSelectionStore();
  const { formStep, setFormStep } = useFormStepStore();
  return (
    <div
      className={`space-x-5 flex justify-center sm:justify-end items-center  mt-14`}
    >
      {formStep > 0 ? (
        <Button
          variant={"outline"}
          className="flex m-0 w-fit p-0 px-2 pr-4  border-slate-300 "
          onClick={() => {
            setFormStep(formStep - 1);
          }}
        >
          <Icons type="back" size={20} color="#334155" />
          <p className="pl-1">Go Back</p>
        </Button>
      ) : (
        <></>
      )}
      {condition ? (
        <Button disabled className="flex m-0 w-fit p-0 px-2 pl-5 bg-slate-700">
          <p>{buttonTitle}</p>
          <Icons type="next" size={25} color="white" />
        </Button>
      ) : (
        <Button
          className="flex m-0 w-fit p-0 px-2 pl-5 bg-slate-700"
          onClick={() => {
            setFormStep(formStep + 1);
          }}
        >
          <p>{buttonTitle}</p>
          <Icons type="next" size={25} color="white" />
        </Button>
      )}
    </div>
  );
};

export default FormButtons;
