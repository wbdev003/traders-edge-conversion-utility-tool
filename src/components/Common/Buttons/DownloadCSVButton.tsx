"use client";
import { useState, useEffect } from "react";
import Papa, { UnparseObject } from "papaparse"; // Import UnparseObject from papaparse
import Icons from "../Icons/Icons";
import { Button } from "@/components/ui/button";

const DownloadCSVButton: React.FC<{
  data: boolean | string[][];
  fileName: string;
}> = ({ data, fileName }) => {
  const [csvData, setCSVData] = useState<string>("");

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

  useEffect(() => {
    console.log("csvData", csvData);
    console.log("data", data);
  }, [data, csvData]);

  return (
    <Button
      className="bg-slate-700 m-0 p-0 px-2 pr-4 pl-5 w-fit text-slate-200"
      onClick={downloadCSV}
    >
      <p className="pr-1 ">Download CSV</p>
      <Icons type="download" size={20} color="white"></Icons>
    </Button>
  );
};

export default DownloadCSVButton;
