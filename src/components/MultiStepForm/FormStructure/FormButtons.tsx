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
      className={`w-full flex items-center ${
        formStep === 0 ? "justify-end" : "justify-between"
      }  mt-14`}
    >
      {formStep > 0 ? (
        <Button
          className="flex m-0 w-fit p-0 px-2 pr-4 bg-slate-700"
          onClick={() => {
            setFormStep(formStep - 1);
          }}
        >
          <Icons type="back" size={20} color="white" />
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
