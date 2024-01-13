import React from "react";
import { Separator } from "@/components/ui/separator";

const GetStartedStep = () => {
  return (
    <div
      className="text-slate-700 font-normal max-w-xl mt-8 mx-auto py-3 px-10 bg-slate-200 rounded-xl shadow-lg 
      border-slate-400 border-solid border-2 "
    >
      <p className="text-center text-lg font-semibold mb-4">
        Welcome to the Trade Conversion Utility Tool. Follow these steps to get
        started:
      </p>
      <div className="my-3 bg-slate-400 h-[0.15em]">
        <Separator className="" />
      </div>
      <ul className="list-decimal pl-6">
        <li className="text-base mb-4">
          Click on {""}
          <span className="font-semibold">&ldquo;Get Started.&rdquo;</span> to
          begin the conversion process.
        </li>
        {/* Add more list items for additional steps if needed */}
      </ul>
    </div>
  );
};

export default GetStartedStep;
