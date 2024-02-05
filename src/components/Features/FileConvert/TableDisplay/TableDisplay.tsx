import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { checkCSVForMissingFields } from "@/lib/utils";
import { useErrorStore } from "@/store/useErrorState";
import EditableCell from "@/components/Common/Table/EditableCell";
import { useToast } from "@/components/ui/use-toast";
import { fetchStockInfo } from "@/apiClient/fetchData";

interface FileConvertTableDisplayProps {
  data: boolean | string[][];
}

const FileConvertTableDisplay = ({ data }: FileConvertTableDisplayProps) => {
  const { setIsEmptyFields } = useErrorStore();
  const [header, ...rows] = Array.isArray(data) ? data : [];
  const initialInputValues: string[][] = rows;
  const [inputValues, setInputValues] =
    useState<string[][]>(initialInputValues);
  const { toast } = useToast();

  // TODO
  const fetchMissingData = async () => {
    // Identify missing data from the CSV
    const missingDataIndexes: number[] = [];

    inputValues.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell === "") {
          missingDataIndexes.push(rowIndex);
        }
      });
    });

    console.log(missingDataIndexes);
  };

  function handleInputChange(
    rowIndex: number,
    cellIndex: number,
    value: string
  ) {
    const updatedInputValues = [...inputValues];
    updatedInputValues[rowIndex][cellIndex] = value;
    setInputValues(updatedInputValues);
  }

  useEffect(() => {
    // Check if data is an array before calling the function
    if (Array.isArray(data)) {
      const isEmptyFields = checkCSVForMissingFields(data);
      if (isEmptyFields?.hasMissingFields) {
        setIsEmptyFields(true);
        toast({
          variant: "destructive",
          title: "Missing Fields",
          description:
            "Fields in the table are missing. Please fill in all required values.",
        });
        // Fetch missing data and update the table
        fetchMissingData();
      }
    } else {
      toast({
        variant: "destructive",
        title: "Invalid data format.",
        description:
          "Fields in the table are invalid. Please fill in all required values.",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Table>
      {/* Table Header */}
      <TableHeader>
        <TableRow>
          {/* Map through header items to create TableHead components */}
          {header?.map((headerItem, index) => (
            <TableHead key={index}>{headerItem}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      {/* Table Body */}
      <TableBody>
        {/* Map through rows to create TableRow components */}
        {rows?.map((rowData, rowIndex) => (
          <TableRow key={rowIndex}>
            {/* Map through cell data to create formatted TableCell components */}
            {rowData?.map((cellData, cellIndex) => (
              <TableCell key={cellIndex}>
                {cellData === "" ? (
                  <EditableCell
                    cellIndex={cellIndex}
                    rowIndex={rowIndex}
                    inputValues={inputValues}
                    handleInputChange={handleInputChange}
                    mode={cellData === ""}
                    isEditMode={cellData === ""}
                  />
                ) : (
                  cellData
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default FileConvertTableDisplay;
