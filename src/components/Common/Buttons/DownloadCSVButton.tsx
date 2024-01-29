"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Papa from "papaparse"; // Import UnparseObject from papaparse
import Icons from "../Icons/Icons";
import { Button } from "@/components/ui/button";
import { useFormStepStore } from "@/store/useFormStepStore";
import useResetForm from "@/hooks/useResetForm";
import { useDownloadState } from "@/store/useDownloadState";

interface DownloadCSVButtonProps {
  data: boolean | string[][];
  fileName: string;
}

const DownloadCSVButton = ({ data, fileName }: DownloadCSVButtonProps) => {
  const [csvData, setCSVData] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setFormStep } = useFormStepStore();
  const { resetFormState } = useResetForm();
  const {
    accountNumber,
    startDate,
    endDate,
    setAccountNumber,
    setStartDate,
    setEndDate,
  } = useDownloadState();

  const downloadCSV = () => {
    // Check if data is an array before attempting to unparse
    if (Array.isArray(data)) {
      const csv = Papa.unparse(data);
      setCSVData(csv);
      const blob = new Blob([csv], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("Invalid data format for CSV"); // Handle the case where data is not an array
    }
  };

  const handleDownload = () => {
    setIsLoading(true);

    // Set a timeout for 1.5 seconds before triggering the download
    setTimeout(() => {
      downloadCSV();
      setIsLoading(false);

      // Set a timeout for another 1 second after downloadCSV
      setTimeout(() => {
        resetFormState();
        setFormStep(1);
      }, 500);
    }, 1750);
  };

  return (
    <>
      {!isLoading ? (
        <Button
          className="bg-slate-700 m-0 p-0 px-2 pr-4 pl-5 w-fit text-slate-200 rounded-full"
          onClick={handleDownload}
        >
          <p className="pr-1 text-md">Download CSV</p>
          <Icons type="download" size={20} color="white"></Icons>
        </Button>
      ) : (
        <Button
          disabled
          className="bg-slate-700 m-0 p-0 px-2 pr-4 pl-5 w-fit text-slate-200 rounded-full"
        >
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <p className="text-md">Please wait</p>
        </Button>
      )}
    </>
  );
};

export default DownloadCSVButton;
