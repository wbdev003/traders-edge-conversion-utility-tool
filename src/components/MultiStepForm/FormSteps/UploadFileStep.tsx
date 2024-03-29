import React from "react";
import FileUpload from "@/components/Features/FileUpload/FileUpload";

const UploadFileStep = () => {
  const handleFileDrop = (files: File[]) => {
    // Handle the dropped files here, e.g., send them to the server.
    console.log("Dropped files:", files);
  };

  return (
    <>
      <FileUpload onFileDrop={handleFileDrop} />
    </>
  );
};

export default UploadFileStep;
