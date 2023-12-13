"use client";
import React from "react";
import TableDisplay from "./TableDisplay/TableDisplay";
import { useFileUploadStore } from "@/store/useFileUploadStore";

const FileConvertLayout = () => {
  const { processedData } = useFileUploadStore();

  return (
    <div>
      <TableDisplay data={processedData} />
    </div>
  );
};

export default FileConvertLayout;
