import { create } from "zustand";

type SelectionState = {
  brokerIndex: number | null;
  brokerSelection: string;
};

type SelectionActions = {
  setBrokerIndex: (newBrokerIndex: number | null) => void;
  setBrokerSelection: (newBrokerSelection: string) => void;
};

export const useSelectionStore = create<SelectionState & SelectionActions>(
  (set) => ({
    brokerIndex: null,
    brokerSelection: "",
    setBrokerIndex: (newBrokerIndex: number | null) =>
      set({ brokerIndex: newBrokerIndex }),
    setBrokerSelection: (newBrokerSelection: string) =>
      set({ brokerSelection: newBrokerSelection }),
  })
);
