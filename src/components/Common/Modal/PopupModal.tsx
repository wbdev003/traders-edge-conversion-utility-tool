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
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useModalStore } from "@/store/useModalStore";
import { Separator } from "@/components/ui/separator";
import logo from "../../../../public/images/traders-edge-logo.png";
import Image from "next/image";

const PopupModal = () => {
  /* State */
  const { toggleModal, setToggleModal } = useModalStore();

  // Data for each step
  const steps = [
    {
      title: "Getting Started",
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
    /* {
      title: "Submit",
      content: [
        'Once you are satisfied with the imported data, click on "Submit" to finalize the conversion process.',
        "The tool will consolidate the data and generate a summary report for your reference.",
        "Review the summary to ensure all trades are accurately converted and imported.",
      ],
    }, */
  ];

  return (
    <div>
      <Modal
        isOpen={toggleModal}
        onOpenChange={() => setToggleModal(!toggleModal)}
        className="w-5/12 p-6"
        placement={"auto"}
      >
        <ModalContent className="bg-white ">
          <ModalHeader className="  flex flex-col">
            <div className="  flex  items-center justify-center my-2">
              <Image height={180} width={180} src={logo} alt="" />
            </div>
            <p className="text-base text-center md:text-left md:text-lg mb-2  text-slate-500">
              Trade Import Utility Conversion Tool
            </p>
            <p className="text-sm md:text-base text-left mb-4 ">
              Welcome to the Trade Conversion Utility Tool – your solution for
              effortlessly converting and importing trade data.
            </p>
          </ModalHeader>
          <Separator />
          <div className="overflow-y-scroll space-y-4 w-full ">
            {steps.map((step, index) => (
              <p className="w-10/12  " key={index}>
                <strong className="text-base md:text-lg text-slate-500 ">{`${
                  index > 0 ? `Step ${index}:` : ""
                } ${step.title}`}</strong>
                <ul className="list-disc pl-6 space-y-1 mt-1">
                  {step.content.map((item, i) => (
                    <li key={i} className="text-sm md:text-base">
                      {item}
                    </li>
                  ))}
                </ul>
              </p>
            ))}

            <p className=" w-11/12  py-3 px-5 bg-slate-200 rounded-lg ">
              <strong>Support:</strong> For any issues or questions, consult the
              tool&apos;s documentation or reach out to our support team. Happy
              trading!
            </p>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PopupModal;
