"use client";
import React from "react";
import { useFormStepStore } from "@/store/useFormStepStore";
import Container from "../Utils/Container/Container";
import ProgressBar from "./ProgressBar/ProgressBar";
import ExitButton from "../Buttons/ExitButton";

const FormStepProgress = () => {
  const { formStep } = useFormStepStore();

  return (
    <div className=" w-full font-semibold py-4 bg-slate-50 shadow-sm">
      <Container>
        <div className="flex flex-col items-center justify-between ">
          <div className=" flex w-full items-center justify-between mb-4">
            <p className="text-slate-600 font-base text-base">{`Step ${formStep} of 3`}</p>
            <ExitButton mode="icon" />
          </div>
          <ProgressBar stepProgress={formStep} />
        </div>
      </Container>
    </div>
  );
};

export default FormStepProgress;
