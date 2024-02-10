"use client";
import React from "react";
import { useFormStepStore } from "@/store/useFormStepStore";
import { useSelectionStore } from "@/store/useSelectionStore";
import { useFileUploadStore } from "@/store/useFileUploadStore";
import FormStructure from "./FormStructure/FormStructureLayout";
import SelectBrokerStep from "./FormSteps/SelectBrokerStep";
import UploadFileStep from "./FormSteps/UploadFileStep";
import DisplayDataStep from "./FormSteps/DisplayDataStep";
import FormButtonsLayout from "../Common/Buttons/FormButtonsLayout";
import useLeavePageWarning from "@/hooks/useLeavePageWarning";
import useToggleModal from "@/hooks/useToggleModal";
import { FormFields } from "@/models/clientModels";
import { convertTradeData } from "@/helpers/apiClient/apiClient";
import { useLoadingStore } from "@/store/useLoadingStore";
import LoadingSpinner from "./FormSteps/Loading/LoadingSpinner";
import { useToast } from "../ui/use-toast";
import InstructionLayout from "./Instruction/InstructionLayout";
import { useEffect, useState } from "react";

const MultiStepForm: React.FC = () => {
  const { brokerIndex, brokerSelection } = useSelectionStore();
  const { formStep, setFormStep } = useFormStepStore();
  const { fileData, fileDetails, setProcessedData } = useFileUploadStore();
  const { loading, setLoading } = useLoadingStore();
  const { toast } = useToast();
  const notSaved = true;
  useLeavePageWarning(notSaved);

  const formFields: Record<number, FormFields> = {
    1: {
      disabledCondition: brokerIndex === null,
      title: "Get Started",
      description: "Choose Your Broker",
      btn1Title: "Go Back",
      displayBtn1: false,
      btn2Title: "Next Step",
      displayBtn2: true,
      btn1Function: () => setFormStep(formStep - 1),
      btn2Function: () => setFormStep(formStep + 1),
    },
    2: {
      disabledCondition: fileData?.length === 0 && fileDetails?.length === 0,
      title: "Import Your Trades",
      description: "Upload Your Trade Data",
      btn1Title: "Go Back",
      displayBtn1: true,
      btn2Title: "Upload",
      displayBtn2: true,
      btn1Function: () => setFormStep(formStep - 1),
      btn2Function: async () => {
        try {
          setLoading(true);
          // Assuming convertTradeData returns a Promise
          let data = await convertTradeData(fileData, brokerSelection);
          setProcessedData(data);
          // Wait for the data processing to complete before moving to the next step
          setFormStep(formStep + 1);
        } catch (error) {
          console.error("Error processing data:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Error Uploading CSV file, Please Try Again.",
          });
        } finally {
          // Set loading to false after a delay x amound of milliseconds
          setTimeout(() => {
            setLoading(false);
          }, 1200);
        }
      },
    },
    3: {
      disabledCondition: fileData.length === 0 && fileDetails.length === 0,
      title: "Your Processed Trades",
      description: "Your processed trades are ready for download.",
      btn1Title: "Go Back",
      displayBtn1: true,
      btn2Title: "Download CSV",
      displayBtn2: false,
      btn1Function: () => setFormStep(formStep - 1),
      btn2Function: () => {},
    },
  };

  return (
    <div className=" flex w-full justify-between space-x-4 ">
      <div className="basis-4/12">
        <InstructionLayout />
      </div>
      <div className="basis-8/12">
        <FormStructure
          title={formFields[formStep].title}
          description={formFields[formStep].description}
        >
          {formStep === 1 && <SelectBrokerStep />}
          {formStep === 2 &&
            (loading ? <LoadingSpinner /> : <UploadFileStep />)}
          {formStep === 3 && <DisplayDataStep />}
        </FormStructure>
      </div>
    </div>
  );
};

export default MultiStepForm;
