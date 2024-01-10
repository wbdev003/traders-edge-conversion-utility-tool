import { create } from "zustand";

type State = {
  loading: boolean;
};

type Actions = {
  setLoading: (newLoading: boolean) => void;
};

// Extend the state and actions with the new models
export const useLoadingStore = create<State & Actions>((set) => ({
  loading: false,
  setLoading: (newLoading: boolean) => set({ loading: newLoading }),
}));
