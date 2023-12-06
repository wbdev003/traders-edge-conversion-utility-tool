"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ReactNode } from "react";
import { useFormStepStore } from "@/store/useFormStepStore";
import { useFileUploadStore } from "@/store/useFileUploadStore";
import DownloadCSVButton from "@/components/Common/Buttons/DownloadCSVButton";

interface FormStructureProps {
  children: ReactNode;
  title: string; // Add title prop
  description: string; // Add description prop
  buttonTitle: string;
}

const FormStructure: React.FC<FormStructureProps> = ({
  children,
  title,
  description,
  buttonTitle,
}) => {
  const { formStep } = useFormStepStore();
  const { processedData } = useFileUploadStore();

  return (
    <Card className="mt-6 rounded-xl p-7 bg-slate-50 shadow-md max-h-fit min-h-[29.5rem] relative">
      <CardHeader className="p-0 m-0 text-center relative">
        <CardTitle className="text-2xl sm:text-3xl font-semibold text-slate-700">
          {title}
        </CardTitle>
        <CardDescription className="text-md">{description}</CardDescription>
        {formStep === 3 && (
          <div className="w-full text-right">
            <DownloadCSVButton
              data={processedData}
              fileName="your_data_export_traders_edge.csv"
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0 m-0 mt-4"> {children}</CardContent>
    </Card>
  );
};

export default FormStructure;
