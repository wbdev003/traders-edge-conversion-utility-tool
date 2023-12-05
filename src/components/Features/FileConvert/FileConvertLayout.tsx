"use client";
import React, { useEffect, useState } from "react";
import TableDisplay from "./TableDisplay/TableDisplay";
import { Trade } from "@/models/clientModels";
import { useFileUploadStore } from "@/store/useFileUploadStore";
import { errorCase } from "@/helpers/helpers";
import { useSelectionStore } from "@/store/useSelectionStore";

const FileConvertLayout = () => {
  const { fileData } = useFileUploadStore();
  const { brokerSelection } = useSelectionStore();
  const [processedData, setProcessedData] = useState<boolean | string[][]>([]);

  useEffect(() => {
    let res = errorCase(fileData, brokerSelection);
    setProcessedData(res);
    console.log(res);
  }, [fileData, brokerSelection]);

  return (
    <div>
      <TableDisplay data={processedData} />
    </div>
  );
};

export default FileConvertLayout;
