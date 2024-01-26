import React, { useState } from "react";
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

  return (
    <div className="relative h-fit w-fit">
      <Input
        className=""
        type="text"
        required
        value={mode ? editedValue : inputValues[rowIndex][cellIndex]}
        onChange={(e) => setEditedValue(e.target.value)}
        onClick={() => {
          setDisplayAcceptButton(true);
        }}
        readOnly={!isEditMode}
      />
      {displayAcceptButton && (
        <Button
          isIconOnly
          color="warning"
          variant="faded"
          aria-label="Save Changes"
          className="absolute top-0 right-0 hover:opacity-70"
          onClick={() => {
            handleInputChange(rowIndex, cellIndex, editedValue);
            setDisplayAcceptButton(false);
          }}
        >
          <Icons type="check" size={20} color="green" />
        </Button>
      )}
    </div>
  );
};

export default EditableCell;
