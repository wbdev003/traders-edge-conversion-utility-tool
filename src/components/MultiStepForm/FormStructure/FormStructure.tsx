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
      <div
        className={`w-full flex items-center ${
          formStep === 1 ? "justify-end" : "justify-between"
        }  mt-14`}
      >
        {formStep > 1 ? (
          <Button
            className="flex m-0 w-fit p-0 px-2 pr-4"
            onClick={() => {
              setFormStep(formStep - 1);
            }}
          >
            <Icons type="back" size={20} color="white" />
            <p className="pl-1">Go Back</p>
          </Button>
        ) : (
          <></>
        )}
        {brokerSelection === null ? (
          <Button disabled className="flex m-0 w-fit p-0 px-2 pl-5">
            <p>{buttonTitle}</p>
            <Icons type="next" size={25} color="white" />
          </Button>
        ) : (
          <Button
            className="flex m-0 w-fit p-0 px-2 pl-5"
            onClick={() => {
              setFormStep(formStep + 1);
            }}
          >
            <p>{buttonTitle}</p>
            <Icons type="next" size={25} color="white" />
          </Button>
        )}
      </div>
    </Card>
  );
};

export default FormStructure;
