import React from "react";
import { Progress } from "@/components/ui/progress";

interface IProgressBar {
  stepProgress: number;
}

const ProgressBar = ({ stepProgress }: IProgressBar) => {
  return (
    <>
      <Progress
        value={(stepProgress / 3) * 100}
        max={3}
        color=""
        className="w-full  bg-gradient-to-r from-slate-300 to-slate-400"
      />
    </>
  );
};

export default ProgressBar;
