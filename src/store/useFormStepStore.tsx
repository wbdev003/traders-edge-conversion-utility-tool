import create from "zustand";

type State = {
  formStep: number;
};

type Actions = {
  setFormStep: (newFormStep: number) => void;
};

// Extend the state and actions with the new models
export const useFormStepStore = create<State & Actions>((set) => ({
  formStep: 0,
  setFormStep: (newFormStep: number) => set({ formStep: newFormStep }),
}));
