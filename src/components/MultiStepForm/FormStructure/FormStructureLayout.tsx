"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ReactNode } from "react";

interface FormStructureProps {
  children: ReactNode;
  title: string; // Add title prop
  description: string; // Add description prop
}

const FormStructure: React.FC<FormStructureProps> = ({
  children,
  title,
  description,
}) => {
  return (
    <Card className="mt-6 rounded-xl p-7 bg-slate-50 shadow-md min-h-fit w-11/12 min-w-fit">
      <CardHeader className="p-0 m-0 text-center relative">
        <CardTitle className="text-2xl sm:text-3xl font-semibold text-slate-700">
          {title}
        </CardTitle>
        <CardDescription className="text-md">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-0 m-0 mt-4"> {children}</CardContent>
    </Card>
  );
};

export default FormStructure;
