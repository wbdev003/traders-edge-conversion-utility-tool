"use client";
import React from "react";
import { Button } from "../ui/button";
import { useFormStepStore } from "@/store/useFormStepStore";
import { useSelectionStore } from "@/store/useSelectionStore";
import Icons from "../Common/Icons/Icons";
import DownloadCSVButton from "../Common/Buttons/DownloadCSVButton";
import { useFileUploadStore } from "@/store/useFileUploadStore";
import FormStructure from "./FormStructure/FormStructureLayout";
import SelectBrokerStep from "./FormSteps/SelectBrokerStep";
import UploadFileStep from "./FormSteps/UploadFileStep";
import DisplayDataStep from "./FormSteps/DisplayDataStep";
import GetStartedStep from "./FormSteps/GetStartedStep";
import FormButtonsLayout from "./FormStructure/FormButtons/FormButtonsLayout";
import useLeavePageWarning from "@/hooks/useLeavePageWarning";
import SuccessStep from "./FormSteps/SuccessStep";
import useToggleModal from "@/hooks/useToggleModal";

// Define an interface for form fields
interface FormFields {
  title: string;
  disabledCondition: boolean;
  description: string;
  btn1Title?: string;
  displayBtn1?: boolean;
  btn2Title?: string;
  displayBtn2?: boolean;
}

const MultiStepForm: React.FC = () => {
  /* State */
  const { brokerIndex } = useSelectionStore();
  const { formStep } = useFormStepStore();
  const { fileData, fileDetails } = useFileUploadStore();

  const toggleModal = useToggleModal();

  // Setting the initial state indicating whether changes are not saved
  const notSaved = true;
  useLeavePageWarning(notSaved); // handle leave page warning based on the notSaved state

  // Define dynamic form fields based on formStep
  const formFields: Record<number, FormFields> = {
    /* 0: {
      title: "Get Started",
      description: "Begin Conversion",
      btn1Title: "Go Back",
      displayBtn1: true,
      btn2Title: "Get Started",
      displayBtn2: true,
    }, */
    1: {
      disabledCondition: brokerIndex === null,
      title: "Get Started",
      description: "Begin Conversion",
      btn1Title: "Go Back",
      displayBtn1: true,
      btn2Title: "Get Started",
      displayBtn2: true,
    },
    2: {
      disabledCondition: fileData.length === 0 && fileDetails.length === 0,
      title: "Get Started",
      description: "Begin Conversion",
      btn1Title: "Go Back",
      displayBtn1: true,
      btn2Title: "Get Started",
      displayBtn2: true,
    },
    3: {
      disabledCondition: fileData.length === 0 && fileDetails.length === 0,
      title: "Get Started",
      description: "Begin Conversion",
      btn1Title: "Go Back",
      displayBtn1: true,
      btn2Title: "Get Started",
      displayBtn2: true,
    },
    /* 4: {
      title: "Success",
      description:
        "Congratulations! Your trades have been successfully imported.",
      buttonTitle: "Next Step",
    }, */
  };

  return (
    <FormStructure
      title={formFields[formStep].title}
      description={formFields[formStep].description}
    >
      {/* {formStep === 0 && (
        <>
          <GetStartedStep />
          <FormButtonsLayout
            disabledCondition={formFields[formStep].disabledCondition}
            btn1Title={formFields[formStep].btn1Title}
            displayBtn1={formFields[formStep].displayBtn1}
            btn2Title={formFields[formStep].btn2Title}
            displayBtn2={formFields[formStep].displayBtn2}
          />
        </>
      )} */}
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
      {/* {formStep === 4 && (
        <>
          <SuccessStep />
        </>
      )} */}
    </FormStructure>
  );
};

export default MultiStepForm;
