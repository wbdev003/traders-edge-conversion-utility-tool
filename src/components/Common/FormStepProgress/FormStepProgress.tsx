"use client";
import React from "react";
import { useFormStepStore } from "@/store/useFormStepStore";
import Container from "../Utils/Container/Container";
import ProgressBar from "./ProgressBar";
import { Button } from "@/components/ui/button";
import Icons from "../Icons/Icons";

const FormStepProgress = () => {
  const { formStep, setFormStep } = useFormStepStore();
  return (
    <div className=" w-full font-semibold py-4 bg-slate-50 ">
      <Container>
        <div className="flex flex-col items-center justify-between ">
          <div className=" flex w-full items-center justify-between mb-4">
            <p className="text-slate-500 font-normal text-base">{`Step ${formStep} of 3`}</p>
            <Button className="rounded-full hover:bg-slate-100 w-fit p-1 m-0 h-fit shadow-none">
              <Icons type="close" color="black" size={22} />
            </Button>
          </div>
          <ProgressBar stepProgress={formStep} />
        </div>
      </Container>
    </div>
  );
};

export default FormStepProgress;
