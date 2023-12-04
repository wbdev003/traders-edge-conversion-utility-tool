import create from "zustand";

type State = {
  files: File[];
};

type Actions = {
  setFiles: (newFormStep: File[]) => void;
};

// Extend the state and actions with the new models
export const useFormStepStore = create<State & Actions>((set) => ({
  files: [],
  setFiles: (newFiles: File[]) => set({ files: newFiles }),
}));
