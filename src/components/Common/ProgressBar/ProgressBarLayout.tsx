"use client";
import React from "react";
import { useFormStepStore } from "@/store/useFormStepStore";
import Container from "../Utils/Container/Container";
import ProgressBar from "./ProgressBar/ProgressBar";
import ExitButton from "../Buttons/ExitButton";
import FormButtonsLayout from "@/components/Common/Buttons/FormButtonsLayout";
import { FormFields } from "@/models/clientModels";
import { useSelectionStore } from "@/store/useSelectionStore";
import { useFileUploadStore } from "@/store/useFileUploadStore";
import { convertTradeData } from "@/helpers/apiClient/apiClient";
import { useLoadingStore } from "@/store/useLoadingStore";
import { useToast } from "@/components/ui/use-toast";

const FormStepProgress = () => {
  const { formStep, setFormStep } = useFormStepStore();
  const { brokerIndex, brokerSelection } = useSelectionStore();
  const { fileData, fileDetails, setProcessedData, processedData } =
    useFileUploadStore();
  const { loading, setLoading } = useLoadingStore();
  const { toast } = useToast();

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
    <div className=" w-full font-semibold py-4 bg-slate-50 shadow-sm">
      <Container>
        <div className="flex flex-col items-center justify-between ">
          <div className=" flex w-full items-center justify-between mb-4">
            <p className="text-slate-600 font-base text-lg">{`Step ${formStep} of 3`}</p>
            <div className="flex flex-row items-center justify-between space-x-5">
              <FormButtonsLayout {...formFields[formStep]} />
              <ExitButton mode="icon" />
            </div>
          </div>
          <ProgressBar stepProgress={formStep} />
        </div>
      </Container>
    </div>
  );
};

export default FormStepProgress;
