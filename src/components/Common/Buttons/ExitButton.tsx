import React from "react";
import { Button } from "@/components/ui/button";
import { useFormStepStore } from "@/store/useFormStepStore";
import { useModalStore } from "@/store/useModalStore";
import { useFileUploadStore } from "@/store/useFileUploadStore";
import { useSelectionStore } from "@/store/useSelectionStore";
import Icons from "../Icons/Icons";

interface ExitButtonProps {
  mode: "icon" | "regular";
}

const ExitButton = ({ mode }: ExitButtonProps) => {
  const { formStep, setFormStep } = useFormStepStore();
  const { toggleModal, setToggleModal } = useModalStore();
  const { setBrokerSelection, setBrokerIndex } = useSelectionStore();
  const { setFileData, setFileDetails, setRejected } = useFileUploadStore();

  function onExitHandler() {
    setFormStep(0);
    setBrokerSelection("");
    setBrokerIndex(null);
    setFileData([]);
    setFileDetails([]);
    setRejected([]);
  }
  return (
    <>
      {mode === "icon" && (
        <>
          <Button
            variant={"outline"}
            className="rounded-full hover:bg-slate-400 bg-transparent w-fit p-2 m-0 h-fit shadow-none"
            onClick={() => {
              onExitHandler();
            }}
          >
            <Icons type="close" color="black" size={20} />
          </Button>
        </>
      )}
      {mode === "regular" && (
        <>
          <Button
            onClick={onExitHandler}
            className="bg-slate-700 text-white px-4 py-2 rounded-md hover:bg-slate-800 transition duration-300"
          >
            Go Back to the Beginning
          </Button>
        </>
      )}
    </>
  );
};

export default ExitButton;
