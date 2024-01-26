"use client";
import React, { useEffect } from "react";
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
