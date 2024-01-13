"use client";
import React from "react";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/store/useModalStore";
import LinkButton from "../Buttons/LinkButton";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import logo from "../../../../public/images/traders-edge-logo.png";
import Image from "next/image";

const supportEmail = "conversion@tradersedge.ca";
// data for each step
const steps = [
  {
    title: "Choose Your Broker",
    content: [
      '• Select "Choose Your Broker" to specify the broker from which you are importing data. to ensure accurate data conversion for your broker.',
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

const InstructionModal = () => {
  /* State */
  const { toggleModal, setToggleModal } = useModalStore();
  return (
    <div>
      <Dialog
        open={toggleModal}
        defaultOpen={toggleModal}
        onOpenChange={() => setToggleModal(!toggleModal)} // temporary change to remove toggle modal appear on site visit
      >
        <DialogContent className="bg-white p-6 max-h-full h-fit">
          <DialogHeader className=" w-11/12 mx-auto ">
            <div className=" w-full flex items-center justify-center my-2">
              <Image height={180} width={180} src={logo} alt="" />
            </div>
            <DialogTitle className="text-base text-center md:text-left md:text-lg mb-2  text-slate-500">
              Trade Import Utility Conversion Tool
            </DialogTitle>
            <DialogDescription className="text-sm md:text-base  text-center mb-4 ">
              <span className="md:text-left block w-full">
                Welcome to the Trade Conversion Utility Tool – Brought to you
                by:{" "}
                <LinkButton href="https://www.tradersedge.ca/" target="_blank">
                  Traders Edge
                </LinkButton>
              </span>
            </DialogDescription>
          </DialogHeader>
          <Separator />
          <div className="max-h-96 overflow-y-scroll space-y-4 w-full ">
            {steps.map((step, index) => (
              <div className="w-11/12 mx-auto text-slate-500" key={index}>
                <strong className="text-base md:text-lg text-slate-500 ">{`${`Step ${
                  index + 1
                }:`} ${step.title}`}</strong>
                <ul className="list-disc pl-6 space-y-1 mt-1">
                  {step.content.map((item, i) => (
                    <li key={i} className="text-sm md:text-base">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <DialogDescription className=" w-11/12 mx-auto  py-3 px-5 bg-slate-200 rounded-lg ">
              <strong>Support:</strong> For any issues or questions, consult the
              tool&apos;s documentation or reach out to our support team at:
              <Link href={`mailto:${supportEmail}`}>
                <p className="text-slate-500 font-semibold hover:text-slate-400">
                  {supportEmail}
                </p>
              </Link>
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InstructionModal;
