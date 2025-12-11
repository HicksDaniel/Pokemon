import { create } from "zustand";
import { initAuth0 } from "../AuthProvider/Authorization";

type AuthStore = {
  client: any;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  authorizeUser: () => Promise<void>;
};

const useAuthStore = create<AuthStore>((set) => ({
  client: null,
  isAuthenticated: false,
  isAuthenticating: false,

  authorizeUser: async () => {
    console.log("auth running");

    const newClient = await initAuth0();
    set({ client: newClient, isAuthenticating: false });

    const isAuth = await newClient?.isAuthenticated();

    if (isAuth) {
      set({ isAuthenticated: true });
    } else {
      newClient?.loginWithRedirect();
    }
  },
}));

export default useAuthStore;

