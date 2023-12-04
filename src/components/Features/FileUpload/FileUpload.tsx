"use client";
import React, { useCallback, useState, useEffect } from "react";
import Dropzone, {
  useDropzone,
  DropzoneRootProps,
  Accept,
} from "react-dropzone";
import Icons from "@/components/Common/Icons/Icons";
import { FileRejection } from "react-dropzone";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  onFileDrop: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileDrop }) => {
  /* State */
  const [files, setFiles] = useState<File[]>([]);
  const [rejected, setRejected] = useState<FileRejection[]>([]);

  /* Hooks */
  const { toast } = useToast();

  /* Actions */
  const handleDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      // Allow only one file
      const csvFile = acceptedFiles[0];

      // Filter out rejected files that are not CSV
      if (csvFile && csvFile.name.toLowerCase().endsWith(".csv")) {
        setFiles([csvFile]);
        setRejected([]);
        if (onFileDrop) {
          onFileDrop([csvFile]);
        }
      } else {
        setFiles([]);
        setRejected(rejectedFiles);
        toast({
          variant: "destructive",
          title: "Invalid File",
          description: "Please upload a valid CSV file.",
        });
      }
    },
    [onFileDrop, toast]
  );

  const { getRootProps, getInputProps, isDragActive }: DropzoneRootProps =
    useDropzone({
      onDrop: handleDrop,
      accept: ".csv", // Specify accepted file types
      maxFiles: 1, // Allow only one file
    });

  return (
    <form action="">
      <div
        {...getRootProps()}
        className="border-dashed border-2 border-slate-400 p-6 rounded-2xl text-center cursor-pointer max-w-xl mx-auto mt-10"
      >
        <input {...getInputProps()} />
        <div
          {...getRootProps()}
          className="flex items-center justify-center flex-col w-full p-7"
        >
          <input {...getInputProps()} />
          <Icons type="upload" color="gray" size={80} />
          <p className="text-2xl text-slate-700">Drag and drop</p>
          <p className="text-lg pt-3 text-slate-700 underline">OR</p>
          <p className="text-slate-700 pt-3 text-lg">click to select files.</p>
        </div>
        {/* Display the uploaded and rejected files */}
        {(files.length > 0 || rejected.length > 0) && (
          <div className="mt-4">
            {files.length > 0 && (
              <div>
                <p className="text-xl font-bold">Uploaded File:</p>

                <ul>
                  {files.map((file, index) => (
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
