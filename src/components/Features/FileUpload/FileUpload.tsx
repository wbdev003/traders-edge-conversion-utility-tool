import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Icons from "@/components/Common/Icons/Icons";

interface FileUploadProps {
  onFileDrop: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileDrop }) => {
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (onFileDrop) {
        onFileDrop(acceptedFiles);
      }
    },
    [onFileDrop]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
  });

  return (
    <div
      {...getRootProps()}
      className="border-dashed border-2 border-slate-400 p-4 rounded-md text-center cursor-pointer max-w-xl mx-auto mt-10"
    >
      <input {...getInputProps()} />
      <div className=" flex items-center justify-center flex-col w-full p-6">
        <Icons type="upload" color="gray" size={80} />
        <p className="text-2xl text-slate-700">Drag and drop files here</p>
        <p className="text-slate-700 pt-3"> or click to select files</p>
      </div>
    </div>
  );
};

export default FileUpload;
