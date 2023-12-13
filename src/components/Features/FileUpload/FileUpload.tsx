"use client";
import React, { useCallback, useState } from "react";
import { useDropzone, DropzoneRootProps } from "react-dropzone";
import Icons from "@/components/Common/Icons/Icons";
import { FileRejection } from "react-dropzone";
import { useToast } from "@/components/ui/use-toast";
import { useFileUploadStore } from "@/store/useFileUploadStore";
import Papa from "papaparse";
import { useSelectionStore } from "@/store/useSelectionStore";

interface FileUploadProps {
  onFileDrop: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileDrop }) => {
  /* State */
  const {
    fileData,
    setFileData,
    rejected,
    setRejected,
    fileDetails,
    setFileDetails,
  } = useFileUploadStore();
  const { brokerSelection } = useSelectionStore();

  /* Display toast notifications. */
  const { toast } = useToast();

  /* Actions */
  const handleDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      // Allow only one file
      const csvFile = acceptedFiles[0];

      if (csvFile && csvFile.name.toLowerCase().endsWith(".csv")) {
        // Parse CSV using Papa.parse library
        Papa.parse(csvFile, {
          complete: function (results) {
            setFileData(results.data);
          },
        });

        setFileDetails([csvFile]);
        setRejected([]);

        if (onFileDrop) {
          onFileDrop([csvFile]);
        }
      } else {
        // Handle the case where the selected file is not a valid CSV
        setFileData([]);
        setRejected(rejectedFiles);

        toast({
          variant: "destructive",
          title: "Invalid File",
          description: "Please upload a valid CSV file.",
        });
      }
    },
    [onFileDrop, toast, setFileData, setRejected, setFileDetails]
  );

  const { getRootProps, getInputProps, isDragActive }: DropzoneRootProps =
    useDropzone({
      onDrop: handleDrop,
      accept: { file: [".csv"] }, // Specify accepted file types
      maxFiles: 1, // Allow only one file
    });

  // Check if the device is mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <form action="" className="">
      <div
        {...getRootProps()}
        className={`border-dashed border-2 border-slate-400 hover:bg-slate-200 p-6 rounded-2xl text-center cursor-pointer max-w-xl mx-auto mt-5 ${
          isDragActive ? "bg-slate-200" : ""
        } ${isMobile ? "pointer-events-none" : ""}`}
      >
        <input {...getInputProps()} />
        <div className="flex items-center justify-center flex-col w-full px-4">
          <Icons type="upload" color="#334155" size={70} />
          <p className="text-slate-600 p-1 mt-1 text-xl font-semibold capitalize underline">
            {isDragActive ? "Drop the file here" : "Click to select file"}
          </p>
        </div>
        {/* Display the uploaded and rejected files */}
        {(fileDetails.length > 0 || rejected.length > 0) && (
          <div className="p-2 mt-2 rounded-2xl bg-slate-300">
            {fileDetails.length > 0 && (
              <div>
                <p className="text-xl font-bold">Uploaded File:</p>
                <ul>
                  {fileDetails.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </form>
  );
};

export default FileUpload;
