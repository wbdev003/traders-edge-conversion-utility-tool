"use client";
import React, { useEffect } from "react";
import TableDisplay from "./TableDisplay/TableDisplay";
import { useFileUploadStore } from "@/store/useFileUploadStore";
import { useDownloadState } from "@/store/useDownloadState";

const FileConvertLayout = () => {
  const { processedData } = useFileUploadStore();
  const { setAccountNumber, setEndDate, setStartDate } = useDownloadState();

  /* Setting state for download file name */
  useEffect(() => {
    console.log(processedData);
    if (Array.isArray(processedData) && processedData?.length > 1) {
      setAccountNumber(processedData[1][0]);
      setStartDate(processedData[processedData?.length - 1][1]);
      setEndDate(processedData[1][1]);
    } else {
      console.error(
        "Invalid data format: processedData is not an array with at least two elements."
      );
    }
  }, []);

  return (
    <div>
      <TableDisplay data={processedData} />
    </div>
  );
};

export default FileConvertLayout;
