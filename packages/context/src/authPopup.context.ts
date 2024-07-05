import { create } from 'zustand';

type State = { isOpen: boolean };
type Actions = {
  setAuthPopup: (status: boolean) => void;
};

export function createAuthPopupContext() {
  return create<State & Actions>((set) => ({
    isOpen: false,
    setAuthPopup(status) {
      set(() => ({ isOpen: status }));
    },
  }));
}
