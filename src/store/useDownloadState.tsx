import { create } from "zustand";

type State = {
  accountNumber: string;
  startDate: string;
  endDate: string;
};

type Actions = {
  setAccountNumber: (newAccountNumber: string) => void;
  setStartDate: (newStartDate: string) => void;
  setEndDate: (newEndDate: string) => void;
};

// Extend the state and actions with the new models
export const useDownloadState = create<State & Actions>((set) => ({
  accountNumber: "",
  startDate: "",
  endDate: "",
  setAccountNumber: (newAccountNumber: string) =>
    set({ accountNumber: newAccountNumber }),
  setStartDate: (newStartDate: string) => set({ startDate: newStartDate }),
  setEndDate: (newEndDate: string) => set({ endDate: newEndDate }),
}));
