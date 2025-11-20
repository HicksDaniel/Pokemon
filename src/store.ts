import { create } from "zustand";
import { initAuth0 } from "./AuthProvider/Authorization";
import type { User } from "@auth0/auth0-spa-js";

export type User = {
  name: string;
  id: string;
};

type Store = {
  user: User;
  client: any;
  isAuthenticated: boolean;
  authorizeUser: () => void;
};

const useStore = create<Store>((set, get) => ({
  user: null,
  client: null,
  isAuthenticated: false,

  authorizeUser: async () => {
    const client = await initAuth0();
    set({ client });
    const isAuthenticated = await client?.isAuthenticated();

    if (isAuthenticated) {
      const user = await client?.getUser();
      set({ user });
      set({ isAuthenticated: true });
    } else {
      client?.loginWithRedirect();
    }
  },
}));

export default useStore;
