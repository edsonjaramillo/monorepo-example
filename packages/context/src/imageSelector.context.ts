import { create } from 'zustand';

import type { Folders } from 'common';

type State = { selectedFolder: Folders };
type Actions = {
  setFolder: (selectedFolder: Folders) => void;
};

export function createImageSelectorContext() {
  return create<State & Actions>((set) => ({
    selectedFolder: 'users',
    setFolder(selectedFolder) {
      set(() => ({ selectedFolder }));
    },
  }));
}
