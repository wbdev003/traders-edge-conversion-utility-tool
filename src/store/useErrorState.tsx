import { create } from "zustand";

type State = {
  isEmptyFields: boolean;
};

type Actions = {
  setIsEmptyFields: (newIsEmptyFields: boolean) => void;
};

// Extend the state and actions with the new models
export const useErrorStore = create<State & Actions>((set) => ({
  isEmptyFields: false,
  setIsEmptyFields: (newIsEmptyFields: boolean) =>
    set({ isEmptyFields: newIsEmptyFields }),
}));
