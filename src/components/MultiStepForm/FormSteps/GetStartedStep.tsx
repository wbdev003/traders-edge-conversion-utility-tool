import React from "react";

const GetStartedStep = () => {
  return (
    <div className="text-slate-700 font-normal max-w-md mx-auto pt-5">
      <p className=" mb-6 text-center text-base">
        Welcome to the Trade Import Utility Conversion Tool. Follow the steps
        below to get started:
      </p>
      <ol className="list-decimal pl-6">
        <li className="text-base mb-4">
          Launch the conversion tool and select{" "}
          <span className="font-semibold">&ldquo;Get Started.&rdquo;</span>
        </li>
        <li className="text-base mb-4">
          This step serves as an introduction to the conversion process.
        </li>
        <li className="text-base mb-4">
          No specific action is required in this step; it is a brief overview to
          initiate the process.
        </li>
      </ol>
    </div>
  );
};

export default GetStartedStep;
