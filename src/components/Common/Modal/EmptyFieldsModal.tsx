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
import { useErrorStore } from "@/store/useErrorState";

const supportEmail = "conversion@tradersedge.ca";

const EmptyFieldsModal = () => {
  const { isEmptyFields, setIsEmptyFields } = useErrorStore();
  const { setToggleModal } = useModalStore();

  return (
    <div>
      <Dialog
        open={isEmptyFields}
        defaultOpen={isEmptyFields}
        onOpenChange={() => setToggleModal(!isEmptyFields)}
      >
        <DialogContent className="bg-white p-6 max-h-full h-fit">
          <DialogHeader className=" w-11/12 mx-auto ">
            <div className=" w-full flex items-center justify-center my-2">
              <Image height={180} width={180} src={logo} alt="" />
            </div>
            <DialogTitle className="text-base text-center md:text-left md:text-lg mb-2  text-slate-500"></DialogTitle>
            <DialogDescription className="text-sm md:text-base  text-center mb-4 "></DialogDescription>
          </DialogHeader>
          <Separator />
          <div className="max-h-96 overflow-y-scroll space-y-4 w-full ">
            <DialogDescription className=" w-11/12 mx-auto  py-3 px-5 bg-slate-200 rounded-lg "></DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmptyFieldsModal;
