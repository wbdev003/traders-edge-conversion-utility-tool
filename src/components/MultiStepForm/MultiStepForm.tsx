"use client";
import * as React from "react";
import { useSelectionStore } from "@/store/useSelectionStore";
import FormStructure from "./FormStructure/FormStructure";
import { useFormStepStore } from "@/store/useFormStepStore";
import PrimaryStep from "./FormSteps/PrimaryStep";
import SecondaryStep from "./FormSteps/SecondaryStep";
import Third from "./FormSteps/ThirdStep";

const MultiStepForm = () => {
  /* State */
  const { brokerSelection, setBrokerSelection } = useSelectionStore(); // Data array for SelectOptionCard components
  const { formStep, setFormStep } = useFormStepStore();

  return (
    <FormStructure
      title="Choose Your Broker"
      description="Select Your Broker"
      buttonTitle="Next Step"
    >
      {formStep === 1 && <PrimaryStep />}
      {formStep === 2 && <SecondaryStep />}
      {formStep === 3 && <Third />}
    </FormStructure>
  );
};

export default MultiStepForm;
