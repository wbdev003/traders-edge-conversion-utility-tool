import create from "zustand";

type State = {
  toggleModal: boolean;
};

type Actions = {
  setToggleModal: (newToggleModal: boolean) => void;
};

// Extend the state and actions with the new models
export const useModalStore = create<State & Actions>((set) => ({
  toggleModal: false,
  setToggleModal: (newToggleModal: boolean) =>
    set({ toggleModal: newToggleModal }),
}));
