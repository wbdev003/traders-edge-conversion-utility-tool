import React from "react";
import Image from "next/image";
import Link from "next/link";
import LinkButton from "../Buttons/LinkButton";
import logo from "../../../../public/images/traders-edge-logo.png";
import { Separator } from "@/components/ui/separator";
import Icons from "../Icons/Icons";
import { Button } from "@nextui-org/react";

const InstructionContent = () => {
  const supportEmail = "conversion@tradersedge.ca";
  // Data for each step
  const steps = [
    {
      title: "Choose Your Broker",
      content: [
        'Select "Choose Your Broker" to specify the broker from which you are importing data. to ensure accurate data conversion for your broker.',
      ],
    },
    {
      title: "Import Trade CSV File",
      content: [
        'Select "Import Trade CSV File" to browse and upload the CSV file containing your trade history from your broker. This step will validate and process the CSV file, extracting the relevant trading information.',
      ],
    },
    {
      title: "Review Your Trade Conversion",
      content: [
        'Navigate to "Trade Conversion" to review the list of your trades. Verify the accuracy of the imported data, including trade details, timestamps, and any associated information and make required adjustments or corrections. Then save the file to your computer as a .csv format',
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
      <div className=" space-y-4 w-full pt-6">
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
        <div className=" mx-auto py-3 px-5 bg-slate-200 rounded-lg ">
          <strong>Support:</strong> For any issues or questions, consult the
          tool&apos;s documentation or reach out to our support team at:
          <Link href={`mailto:${supportEmail}`}>
            <p className="text-slate-500 font-semibold hover:text-slate-400">
              {supportEmail}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstructionContent;
