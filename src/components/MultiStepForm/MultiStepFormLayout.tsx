"use client";
import React from "react";
import { useFormStepStore } from "@/store/useFormStepStore";
import { useSelectionStore } from "@/store/useSelectionStore";
import { useFileUploadStore } from "@/store/useFileUploadStore";
import FormStructure from "./FormStructure/FormStructureLayout";
import SelectBrokerStep from "./FormSteps/SelectBrokerStep";
import UploadFileStep from "./FormSteps/UploadFileStep";
import DisplayDataStep from "./FormSteps/DisplayDataStep";
import FormButtonsLayout from "./FormStructure/FormButtons/FormButtonsLayout";
import useLeavePageWarning from "@/hooks/useLeavePageWarning";
import useToggleModal from "@/hooks/useToggleModal";
import { FormFields } from "@/models/clientModels";

const MultiStepForm: React.FC = () => {
  /* State */
  const { brokerIndex } = useSelectionStore();
  const { formStep } = useFormStepStore();
  const { fileData, fileDetails } = useFileUploadStore();

  const toggleModal = useToggleModal();

  // Setting the initial state indicating whether changes are not saved
  const notSaved = true;
  useLeavePageWarning(notSaved); // handle leave page warning based on the notSaved state

  // Form Fields
  const formFields: Record<number, FormFields> = {
    1: {
      disabledCondition: brokerIndex === null,
      title: "Get Started",
      description: "Choose Your Broker",
      btn1Title: "Go Back",
      displayBtn1: false,
      btn2Title: "Next Step",
      displayBtn2: true,
    },
    2: {
      disabledCondition: fileData.length === 0 && fileDetails.length === 0,
      title: "Import Your Trades",
      description: "Upload Your Trade Data",
      btn1Title: "Go Back",
      displayBtn1: true,
      btn2Title: "Upload",
      displayBtn2: true,
    },
    3: {
      disabledCondition: fileData.length === 0 && fileDetails.length === 0,
      title: "Your Processed Trades",
      description: "Your processed trades are ready for download.",
      btn1Title: "Go Back",
      displayBtn1: true,
      btn2Title: "Download CSV",
      displayBtn2: false,
    },
  };

  return (
    <FormStructure
      title={formFields[formStep].title}
      description={formFields[formStep].description}
    >
      {formStep === 1 && (
        <>
          <SelectBrokerStep />
          <FormButtonsLayout
            disabledCondition={formFields[formStep].disabledCondition}
            btn1Title={formFields[formStep].btn1Title}
            displayBtn1={formFields[formStep].displayBtn1}
            btn2Title={formFields[formStep].btn2Title}
            displayBtn2={formFields[formStep].displayBtn2}
          />
        </>
      )}
      {formStep === 2 && (
        <>
          <UploadFileStep />
          <FormButtonsLayout
            disabledCondition={formFields[formStep].disabledCondition}
            btn1Title={formFields[formStep].btn1Title}
            displayBtn1={formFields[formStep].displayBtn1}
            btn2Title={formFields[formStep].btn2Title}
            displayBtn2={formFields[formStep].displayBtn2}
          />
        </>
      )}
      {formStep === 3 && (
        <>
          <DisplayDataStep />
          <FormButtonsLayout
            disabledCondition={formFields[formStep].disabledCondition}
            btn1Title={formFields[formStep].btn1Title}
            displayBtn1={formFields[formStep].displayBtn1}
            btn2Title={formFields[formStep].btn2Title}
            displayBtn2={formFields[formStep].displayBtn2}
          />
        </>
      )}
    </FormStructure>
  );
};

export default MultiStepForm;
