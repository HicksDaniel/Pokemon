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
  selectedRegion: string;
  // Theme state
  isDarkMode: boolean;
  selectedThemeFamily: string;
  // Theme actions
  toggleTheme: () => void;
  setThemeFamily: (family: string) => void;
  initializeTheme: () => void;
};

const themeFamily = [
  { name: "Lara-Blue", value: "lara-blue", description: "Modern blue theme" },
  { name: "Lara-Amber", value: "lara-amber", description: "Warm amber theme" },
  { name: "Lara-Cyan", value: "lara-cyan", description: "Cool cyan theme" },
  { name: "Lara-Green", value: "lara-green", description: "Natural green theme" },
  { name: "Lara-Indigo", value: "lara-indigo", description: "Deep indigo theme" },
  { name: "Lara-Pink", value: "lara-pink", description: "Vibrant pink theme" },
  { name: "Lara-Purple", value: "lara-purple", description: "Rich purple theme" },
  { name: "Lara-Teal", value: "lara-teal", description: "Elegant teal theme" },
];

const getThemeUrl = (family: string, dark: boolean) => {
  const mode = dark ? "dark" : "light";
  return `/themes/${family.replace("-", `-${mode}-`)}/theme.css`;
};

const updateTheme = (family: string, dark: boolean) => {
  const themeLink = document.getElementById("theme-link") as HTMLLinkElement;
  if (themeLink) {
    themeLink.href = getThemeUrl(family, dark);
  }
};

const useStore = create<Store>((set, get) => ({
  user: null,
  client: null,
  isAuthenticated: false,
  selectedRegion: "Kanto",

  // Theme state
  isDarkMode: true,
  selectedThemeFamily: "lara-blue",

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

  // Theme actions
  initializeTheme: () => {
    const { selectedThemeFamily, isDarkMode } = get();
    let themeLink = document.getElementById("theme-link") as HTMLLinkElement;

    if (!themeLink) {
      themeLink = document.createElement("link");
      themeLink.id = "theme-link";
      themeLink.rel = "stylesheet";
      themeLink.href = getThemeUrl(selectedThemeFamily, isDarkMode);
      document.head.appendChild(themeLink);
    }
  },

  toggleTheme: () => {
    const { selectedThemeFamily, isDarkMode } = get();
    const newDarkMode = !isDarkMode;
    set({ isDarkMode: newDarkMode });
    updateTheme(selectedThemeFamily, newDarkMode);
  },

  setThemeFamily: (family: string) => {
    const { isDarkMode } = get();
    set({ selectedThemeFamily: family });
    updateTheme(family, isDarkMode);
  },
}));

export { themeFamily };
export default useStore;
