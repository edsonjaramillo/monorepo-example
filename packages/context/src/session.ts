import { create } from 'zustand';

type SessionToken = { token: string; expires: number };

type State = { session: SessionToken | undefined; test: string | undefined };
type Actions = {
  signin: (session: SessionToken) => void;
  signout: () => Promise<void>;
};

export function createSessionContext() {
  return create<State & Actions>((set) => ({
    session: undefined,
    test: undefined,
    signin(session) {
      set(() => ({ session }));
    },
    async signout() {
      set(() => ({ session: undefined }));
    },
  }));
}
