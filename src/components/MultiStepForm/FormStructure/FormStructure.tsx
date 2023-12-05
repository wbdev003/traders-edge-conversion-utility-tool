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
import Icons from "@/components/Common/Icons/Icons";
import { useSelectionStore } from "@/store/useSelectionStore";
import { useFormStepStore } from "@/store/useFormStepStore";

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
  /* State */
  const { brokerSelection, setBrokerSelection } = useSelectionStore();
  const { formStep, setFormStep } = useFormStepStore();

  return (
    <Card className="mt-6 rounded-3xl p-7">
      <CardHeader className="p-0 m-0 text-center">
        <CardTitle className="text-2xl sm:text-3xl font-semibold">
          {title}
        </CardTitle>
        <CardDescription className="text-md">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-0 m-0 mt-4"> {children}</CardContent>
    </Card>
  );
};

export default FormStructure;
