"use client";
import * as React from "react";
import { useSelectionStore } from "@/store/useSelectionStore";
import FormStructure from "./FormStructure/FormStructure";
import { useFormStepStore } from "@/store/useFormStepStore";
import SelectBrokerStep from "./FormSteps/SelectBrokerStep";
import UploadFileStep from "./FormSteps/UploadFileStep";
import DisplayDataStep from "./FormSteps/DisplayDataStep";
import { Button } from "../ui/button";
import Icons from "../Common/Icons/Icons";
import { useFileUploadStore } from "@/store/useFileUploadStore";

// Define an interface for form fields
interface FormFields {
  title: string;
  description: string;
  buttonTitle: string;
}

const MultiStepForm: React.FC = () => {
  /* State */
  const { brokerSelection, setBrokerSelection } = useSelectionStore();
  const { formStep, setFormStep } = useFormStepStore();
  const { fileData, fileDetails } = useFileUploadStore();

  // Define dynamic form fields based on formStep
  const formFields: Record<number, FormFields> = {
    0: {
      title: "Get Started",
      description: "Begin Conversion",
      buttonTitle: "Get Started",
    },
    1: {
      title: "Choose Your Broker",
      description: "Select Your Broker",
      buttonTitle: "Next Step",
    },
    2: {
      title: "Import Trade CSV File",
      description: "Import Your Trade CSV File Here.",
      buttonTitle: "Upload",
    },
    3: {
      title: "Your Trade Imports",
      description: "Here are a list of your trades.",
      buttonTitle: "Submit",
    },
  };

  return (
    <FormStructure
      title={formFields[formStep].title}
      description={formFields[formStep].description}
      buttonTitle={formFields[formStep].buttonTitle}
    >
      {/* {formStep === 0 && <SelectBrokerStep />} */}
      {formStep === 1 && <SelectBrokerStep />}
      {formStep === 2 && <UploadFileStep />}
      {formStep === 3 && <DisplayDataStep />}

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
        {brokerSelection === null ? (
          <Button
            disabled
            className="flex m-0 w-fit p-0 px-2 pl-5 bg-slate-700"
          >
            <p>{formFields[formStep].buttonTitle}</p>
            <Icons type="next" size={25} color="white" />
          </Button>
        ) : (
          <Button
            className="flex m-0 w-fit p-0 px-2 pl-5 bg-slate-700"
            onClick={() => {
              setFormStep(formStep + 1);
            }}
          >
            <p>{formFields[formStep].buttonTitle}</p>
            <Icons type="next" size={25} color="white" />
          </Button>
        )}
      </div>
    </FormStructure>
  );
};

export default MultiStepForm;
