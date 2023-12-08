// useCustomHook.js
import { useSelectionStore } from "@/store/useSelectionStore";
import { useFileUploadStore } from "@/store/useFileUploadStore";

function useResetForm() {
  const { setBrokerSelection, setBrokerIndex } = useSelectionStore();
  const { setFileData, setFileDetails, setRejected } = useFileUploadStore();

  const resetFormState = () => {
    setBrokerSelection("");
    setBrokerIndex(null);
    setFileData([]);
    setFileDetails([]);
    setRejected([]);
  };

  return {
    resetFormState,
  };
}

export default useResetForm;
