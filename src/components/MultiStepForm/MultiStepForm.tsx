"use client";
import * as React from "react";
import { useSelectionStore } from "@/store/useSelectionStore";
import FormStructure from "./FormStructure/FormStructure";
import { useFormStepStore } from "@/store/useFormStepStore";
import PrimaryStep from "./FormSteps/PrimaryStep";
import SecondaryStep from "./FormSteps/SecondaryStep";
import ThirdStep from "./FormSteps/ThirdStep";

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

  // Define dynamic form fields based on formStep
  const formFields: Record<number, FormFields> = {
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
      title: "Your Third Step Title",
      description: "Your Third Step Description",
      buttonTitle: "Submit",
    },
  };

  return (
    <FormStructure
      title={formFields[formStep].title}
      description={formFields[formStep].description}
      buttonTitle={formFields[formStep].buttonTitle}
    >
      {formStep === 1 && <PrimaryStep />}
      {formStep === 2 && <SecondaryStep />}
      {formStep === 3 && <ThirdStep />}
    </FormStructure>
  );
};

export default MultiStepForm;
