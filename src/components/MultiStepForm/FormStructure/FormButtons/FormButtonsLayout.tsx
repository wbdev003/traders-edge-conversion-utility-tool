import React from "react";
import { Button } from "@/components/ui/button";
import { useFormStepStore } from "@/store/useFormStepStore";
import Icons from "@/components/Common/Icons/Icons";
import DownloadCSVButton from "@/components/Common/Buttons/DownloadCSVButton";
import { useFileUploadStore } from "@/store/useFileUploadStore";

interface FormButtonsLayoutProps {
  disabledCondition: boolean;
  formstep?: number;
  btn1Title?: string; // New button 1 title
  displayBtn1?: boolean; // New button 1 display condition
  btn1Function: () => void;
  btn2Title?: string; // New button 2 title
  displayBtn2?: boolean; // New button 2 display condition
  btn2Function: () => void;
}

const FormButtonsLayout = ({
  disabledCondition,
  btn1Title,
  displayBtn1,
  btn2Title,
  displayBtn2,
  btn1Function,
  btn2Function,
}: FormButtonsLayoutProps) => {
  /* State */
  const { formStep } = useFormStepStore();
  const { processedData } = useFileUploadStore();

  return (
    <div
      className={`space-x-5 flex justify-center sm:justify-end items-center mt-14`}
    >
      {formStep > 1 && displayBtn1 && (
        <Button
          variant={"outline"}
          className="flex m-0 w-fit p-0 px-2 pr-4 border-slate-300"
          onClick={() => {
            btn1Function();
          }}
        >
          <Icons type="back" size={20} color="#334155" />
          <p className="pl-1">{btn1Title}</p>
        </Button>
      )}
      {/* if Is disabled */}
      {displayBtn2 &&
        (disabledCondition ? (
          <Button
            disabled
            className="flex m-0 w-fit p-0 px-2 pl-5 bg-slate-700"
            onClick={() => {
              btn2Function();
            }}
          >
            <p>{btn2Title}</p>
            <Icons type="next" size={25} color="white" />
          </Button>
        ) : (
          <Button
            className="flex m-0 w-fit p-0 px-2 pl-5 bg-slate-700"
            onClick={() => {
              btn2Function();
            }}
          >
            <p>{btn2Title}</p>
            <Icons type="next" size={25} color="white" />
          </Button>
        ))}
      {!displayBtn2 && (
        <DownloadCSVButton
          data={processedData}
          fileName="traders-edge-your-converted-trade-data"
        />
      )}
    </div>
  );
};

export default FormButtonsLayout;
