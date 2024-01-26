import React from "react";
import { CircularProgress } from "@nextui-org/progress";
import MoonLoader from "react-spinners/MoonLoader";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col space-y-4 w-full p-10 items-center">
      <MoonLoader size={50} aria-label="Loading Spinner" data-testid="loader" />
      <p className=" text-slate-600 font-semibold">Processing Your Data...</p>
    </div>
  );
};

export default LoadingSpinner;
