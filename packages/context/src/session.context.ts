import { create } from 'zustand';

import type { SessionWithUser } from 'db';

type State = { session: SessionWithUser | undefined };
type Actions = {
  signin: (session: SessionWithUser) => void;
  signout: () => Promise<void>;
};

export function createSessionContext() {
  return create<State & Actions>((set) => ({
    session: undefined,
    signin(session) {
      set(() => ({ session }));
    },
    async signout() {
      set(() => ({ session: undefined }));
    },
  }));
}
