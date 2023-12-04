import create from "zustand";

type State = {
  brokerSelection: number | null;
};

type Actions = {
  setBrokerSelection: (newBrokerSelection: number | null) => void;
};

// Extend the state and actions with the new models
export const useSelectionStore = create<State & Actions>((set) => ({
  brokerSelection: null,
  setBrokerSelection: (newBrokerSelection: number | null) =>
    set({ brokerSelection: newBrokerSelection }),
}));
