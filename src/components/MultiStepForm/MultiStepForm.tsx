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
import GetStartedStep from "./FormSteps/GetStartedStep";
import FormButtons from "./FormStructure/FormButtons";
import useLeavePageWarning from "@/hooks/useLeavePageWarning";

// Define an interface for form fields
interface FormFields {
  title: string;
  description: string;
  buttonTitle: string;
}

const MultiStepForm: React.FC = () => {
  /* State */
  const { brokerIndex } = useSelectionStore();
  const { formStep } = useFormStepStore();
  const { fileData, fileDetails } = useFileUploadStore();

  // Setting the initial state indicating whether changes are not saved
  const notSaved = true;
  useLeavePageWarning(notSaved); // handle leave page warning based on the notSaved state

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
      buttonTitle: "Next Step",
    },
    3: {
      title: "Review Your Trade Imports",
      description: "Here are a list of your trades.",
      buttonTitle: "Next Step",
    },
  };

  return (
    <FormStructure
      title={formFields[formStep].title}
      description={formFields[formStep].description}
      buttonTitle={formFields[formStep].buttonTitle}
    >
      {formStep === 0 && (
        <>
          <GetStartedStep />

          <FormButtons
            condition={false}
            buttonTitle={formFields[formStep].buttonTitle}
          />
        </>
      )}
      {formStep === 1 && (
        <>
          <SelectBrokerStep />
          <FormButtons
            condition={brokerIndex === null}
            buttonTitle={formFields[formStep].buttonTitle}
          />
        </>
      )}
      {formStep === 2 && (
        <>
          <UploadFileStep />
          <FormButtons
            condition={fileData.length === 0 && fileDetails.length === 0}
            buttonTitle={formFields[formStep].buttonTitle}
          />
        </>
      )}
      {formStep === 3 && (
        <>
          <DisplayDataStep />
          <FormButtons
            condition={fileData.length === 0 && fileDetails.length === 0}
            buttonTitle={formFields[formStep].buttonTitle}
          />
        </>
      )}
    </FormStructure>
  );
};

export default MultiStepForm;
