"use client";
import React from "react";
import { Separator } from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";

interface IDivider {
  width: string;
}

const Divider = ({ width }: IDivider) => {
  return <Separator className={` mt-2`} />;
};

export default Divider;
