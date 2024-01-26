import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import InstructionContent from "@/components/MultiStepForm/Instruction/Content/InstructionContent";
import { Button } from "@/components/ui/button";
import Icons from "@/components/Common/Icons/Icons";

const InstructionLayout = () => {
  return (
    <Card className="shadow-md h-fit rounded-xl bg-slate-50 mt-6 z-0 p-7 min-w-full">
      <CardBody className="m-0 p-0 min-w-fit">
        <InstructionContent />
      </CardBody>
    </Card>
  );
};

export default InstructionLayout;
