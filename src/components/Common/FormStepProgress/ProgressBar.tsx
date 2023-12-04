import React from "react";
import { Progress } from "@/components/ui/progress";

interface IProgressBar {
  stepProgress: number;
}

const ProgressBar = ({ stepProgress }: IProgressBar) => {
  return (
    <>
      <Progress value={1} max={3} className="w-full text-blue " />
    </>
  );
};

export default ProgressBar;
