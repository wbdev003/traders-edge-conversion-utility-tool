import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import InstructionContent from "../Content/InstructionContent";
import { Button } from "@/components/ui/button";
import Icons from "../Icons/Icons";

const InstructionCard = () => {
  return (
    <Card className="shadow-md h-fit rounded-xl overflow-hidden bg-slate-50 mt-6 z-0 p-7 min-w-full">
      {/* <div className=" w-full flex justify-end absolute top-3 right-3">
        <Button className="p-2 rounded-full relative bg-transparent shadow-none hover:bg-slate-300">
          <Icons type="close" color="#334155" size={20} />
        </Button>
      </div> */}
      <CardBody className="m-0 p-0 min-w-fit min-h-fit ">
        <InstructionContent />
      </CardBody>
    </Card>
  );
};

export default InstructionCard;
