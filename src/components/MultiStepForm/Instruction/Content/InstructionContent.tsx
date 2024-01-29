import React from "react";
import Image from "next/image";
import Link from "next/link";
import LinkButton from "../../../Common/Buttons/LinkButton";
import logo from "../../../../public/images/traders-edge-logo.png";
import { Separator } from "@/components/ui/separator";
import Icons from "../../../Common/Icons/Icons";
import { Button } from "@nextui-org/react";

const InstructionContent = () => {
  // Data for each step
  const steps = [
    {
      title: "Choose Your Broker",
      content: [
        'Select "Choose Your Broker" to specify the broker from which you are importing data.',
      ],
    },
    {
      title: "Import Trade CSV File",
      content: [
        'Select "Import Trade CSV File" to upload the CSV file containing your trade history from your broker..',
      ],
    },
    {
      title: "Review Your Trade Conversion",
      content: [
        'Go to "Trade Conversion" to review the list of your trades. Verify the accuracy of the imported trade details and associated information, make required adjustments and save the file as a .csv format ready for Traders Edge import.',
      ],
    },
  ];

  return (
    <div className="">
      <div className=" mx-auto ">
        <h2 className="tracking-tight text-2xl sm:text-3xl font-semibold text-slate-700 text-center">
          Instructions
        </h2>
      </div>
      <div className="space-y-4 pt-6 ">
        {steps.map((step, index) => (
          <div className="w-full mx-auto text-slate-500" key={index}>
            <strong className="text-md md:text-md text-slate-500">{`Step ${
              index + 1
            }: ${step.title}`}</strong>
            <ul className="list-disc pl-4 space-y-1 mt-1">
              {step.content.map((item, i) => (
                <li key={i} className="text-sm md:text-base">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructionContent;
