"use client";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useModalStore } from "@/store/useModalStore";
import { Separator } from "@/components/ui/separator";

const Modal = () => {
  /* State */
  const { toggleModal, setToggleModal } = useModalStore();

  // Data for each step
  const steps = [
    {
      title: "Get Started",
      content: [
        'Launch the conversion tool and select "Get Started."',
        "This step serves as an introduction to the conversion process.",
        "No specific action is required in this step; it is a brief overview to initiate the process.",
      ],
    },
    {
      title: "Choose Your Broker",
      content: [
        'Click on "Choose Your Broker" to specify the trading platform or broker from which you are importing data.',
        "Provide any necessary credentials or authentication details to access your trade information securely.",
        "This step ensures accurate data extraction tailored to your specific broker.",
      ],
    },
    {
      title: "Import Trade CSV File",
      content: [
        'In this step, you\'ll import your trade data by selecting the "Import Trade CSV File" option.',
        "Browse and upload the CSV file containing your trade history.",
        "The tool will validate and process the CSV file, extracting relevant trading information.",
      ],
    },
    {
      title: "Review Your Trade Imports",
      content: [
        'After the file is processed, navigate to "Your Trade Imports" to review a comprehensive list of your trades.',
        "Verify the accuracy of the imported data, including trade details, timestamps, and any associated information.",
        "If needed, make adjustments or corrections before proceeding to the final step.",
      ],
    },
    {
      title: "Submit",
      content: [
        'Once you are satisfied with the imported data, click on "Submit" to finalize the conversion process.',
        "The tool will consolidate the data and generate a summary report for your reference.",
        "Review the summary to ensure all trades are accurately converted and imported.",
      ],
    },
  ];

  return (
    <div>
      <Dialog
        open={toggleModal}
        defaultOpen={toggleModal}
        onOpenChange={() => setToggleModal(!toggleModal)}
      >
        <DialogContent className="p-4 md:p-6">
          <DialogHeader>
            <DialogTitle className="text-lg md:text-xl mb-2">
              Trade Import Utility Conversion Tool
            </DialogTitle>
            <DialogDescription className="text-sm md:text-base text-left mb-4">
              Welcome to the Trade Import Utility Conversion Tool, a tool
              designed to streamline the process of converting and importing
              your trade data. Follow these steps to ensure a smooth experience:
            </DialogDescription>
            <Separator />
          </DialogHeader>
          <div className="max-h-96 overflow-y-scroll space-y-4 w-full">
            {steps.map((step, index) => (
              <DialogDescription className="w-11/12" key={index}>
                <strong className="text-base md:text-lg text-slate-500 ">{`Step ${
                  index + 1
                }: ${step.title}`}</strong>
                <ul className="list-disc pl-6 space-y-1 mt-1">
                  {step.content.map((item, i) => (
                    <li key={i} className="text-sm md:text-base">
                      {item}
                    </li>
                  ))}
                </ul>
              </DialogDescription>
            ))}

            <DialogDescription className=" w-11/12">
              <strong className="text-slate-500">Congratulations!</strong> You
              have successfully completed the trade import process using our
              conversion tool. This efficient utility ensures a hassle-free
              experience, allowing you to focus on your trading strategies
              without the burden of manual data entry. If you encounter any
              issues or have questions, refer to the tool&apos;s documentation
              or reach out to our support team for assistance. Happy trading!
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Modal;
