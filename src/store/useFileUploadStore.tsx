import create from "zustand";
import { FileRejection } from "react-dropzone";

type State = {
  fileDetails: File[];
  fileData: unknown[];
  rejected: FileRejection[];
  convertedFileData: unknown[];
  processedData: boolean | string[][];
};

type Actions = {
  setFileData: (newFile: unknown[]) => void;
  setRejected: (newRejected: FileRejection[]) => void;
  setFileDetails: (newFile: File[]) => void;
  setConvertedFileData: (convertedFileData: unknown[]) => void;
  setProcessedData: (newProcessedData: boolean | string[][]) => void;
};

// Extend the state and actions with the new models
export const useFileUploadStore = create<State & Actions>((set) => ({
  processedData: [],
  fileData: [],
  rejected: [],
  fileDetails: [],
  convertedFileData: [], // Initialize convertedFileData with an appropriate initial value
  setFileDetails: (newFileDetails: File[]) =>
    set({ fileDetails: newFileDetails }),
  setFileData: (newFileData: unknown[]) => set({ fileData: newFileData }),
  setRejected: (newRejected: FileRejection[]) => set({ rejected: newRejected }),
  setConvertedFileData: (convertedFileData: unknown[]) =>
    set({ convertedFileData: convertedFileData }),
  setProcessedData: (newProcessedData: boolean | string[][]) =>
    set({ processedData: newProcessedData }),
}));
