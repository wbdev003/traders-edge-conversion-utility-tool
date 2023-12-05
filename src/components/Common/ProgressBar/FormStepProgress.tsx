"use client";
import React from "react";
import { useFormStepStore } from "@/store/useFormStepStore";
import Container from "../Utils/Container/Container";
import ProgressBar from "./ProgressBar";
import { Button } from "@/components/ui/button";
import Icons from "../Icons/Icons";
import { useModalStore } from "@/store/useModalStore";
import { useSelectionStore } from "@/store/useSelectionStore";
import { useFileUploadStore } from "@/store/useFileUploadStore";

const FormStepProgress = () => {
  const { formStep, setFormStep } = useFormStepStore();
  const { toggleModal, setToggleModal } = useModalStore();
  const { setBrokerSelection, setBrokerIndex } = useSelectionStore();
  const { setFileData, setFileDetails, setRejected } = useFileUploadStore();

  function onExitHandler() {
    setFormStep(0);
    setBrokerSelection("");
    setBrokerIndex(null);
    setFileData([]);
    setFileDetails([]);
    setRejected([]);
  }

  return (
    <div className=" w-full font-semibold py-4 bg-slate-50 shadow-sm">
      <Container>
        <div className="flex flex-col items-center justify-between ">
          <div className=" flex w-full items-center justify-between mb-4">
            <p className="text-slate-600 font-base text-base">{`Step ${formStep} of 3`}</p>
            <Button
              variant={"outline"}
              className="rounded-full hover:bg-slate-400 bg-transparent w-fit p-2 m-0 h-fit shadow-none"
              onClick={() => {
                onExitHandler();
              }}
            >
              <Icons type="close" color="black" size={20} />
            </Button>
          </div>
          <ProgressBar stepProgress={formStep} />
        </div>
      </Container>
    </div>
  );
};

export default FormStepProgress;
