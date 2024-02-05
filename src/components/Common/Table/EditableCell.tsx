import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@nextui-org/react";
import Icons from "../Icons/Icons";

interface EditableCellProps {
  rowIndex: number;
  cellIndex: number;
  inputValues: string[][];
  handleInputChange: (
    rowIndex: number,
    cellIndex: number,
    value: string
  ) => void;
  mode: boolean;
  isEditMode: boolean;
}

const EditableCell: React.FC<EditableCellProps> = ({
  rowIndex,
  cellIndex,
  inputValues,
  handleInputChange,
  mode,
  isEditMode,
}) => {
  const [displayAcceptButton, setDisplayAcceptButton] = useState(false);
  const [editedValue, setEditedValue] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);

  const handleAcceptButtonClick = () => {
    handleInputChange(rowIndex, cellIndex, editedValue);
    setDisplayAcceptButton(false);
  };

  const handleInputClick = () => {
    setDisplayAcceptButton(true);
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isEditMode) {
      handleAcceptButtonClick();
    }
  };

  useEffect(() => {
    setIsEmpty(editedValue.trim() === "");
  }, [editedValue]);

  return (
    <div
      className={`relative h-fit w-fit ${
        isEmpty ? "border-2 border-red-400 rounded-lg overflow-hidden" : ""
      }`}
    >
      <Input
        type="text"
        required
        value={mode ? editedValue : inputValues[rowIndex][cellIndex]}
        onChange={(e) => setEditedValue(e.target.value)}
        onClick={handleInputClick}
        onKeyDown={handleEnterKey}
        readOnly={!isEditMode}
        aria-label={`Cell ${rowIndex + 1}, ${cellIndex + 1}`}
      />
      {displayAcceptButton && (
        <Button
          isIconOnly
          color="warning"
          variant="faded"
          aria-label="Save Changes"
          className="absolute top-0 right-0 hover:opacity-70"
          onClick={handleAcceptButtonClick}
        >
          <Icons type="check" size={20} color="green" />
        </Button>
      )}
    </div>
  );
};

export default EditableCell;
