import { create } from "zustand";
import { initAuth0 } from "./AuthProvider/Authorization";
import type {
  RegionDataResponse,
  RegionListResponse,
  RegionLocationResponse,
  RegionPokeDexResponse,
  PokeDexSpeciesData,
  ResPointer,
} from "./pages/regionpage/regionpage.ts";
import { jsonFetch } from "./utils/request-helpers";

export interface RegionalDataDatasets {
  region: string;
  locations: RegionLocationResponse[];
  dexes: RegionPokeDexResponse[];
  regionalDex?: { title: string; dexPokemonSpecies: PokeDexSpeciesData[] }[];
}

type Store = {
  client: any;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  authorizeUser: () => Promise<void>;
  selectedRegion: string;
  // Region data
  allRegionRes: RegionDataResponse[] | null;
  allRegionalData: RegionalDataDatasets[] | null;
  allPokeDexRes: ResPointer[] | null;
  isLoadingRegions: boolean;
  setAllRegionRes: (data: RegionDataResponse[]) => void;
  setSelectedRegion: (region: string) => void;
  fetchRegionRes: () => Promise<void>;
  fetchRegionData: (region: string) => Promise<void>;
  fetchRegionalPokedex: (region: string) => Promise<void>;
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
  client: null,

  isAuthenticated: false,
  selectedRegion: "Kanto",

  // Region data
  allRegionRes: null,
  allRegionalData: null,
  allPokeDexRes: null,
  allRoutesRes: null,
  isLoadingRegions: false,
  isLoadingLocations: false,
  isLoadingPokeDexes: false,

  // Theme state
  isDarkMode: true,
  selectedThemeFamily: "lara-blue",
  isAuthenticating: false,

  setAllRegionRes: (data) => set({ allRegionRes: data }),

  setSelectedRegion: (region: string) => {
    const { fetchRegionData } = get();
    set({ selectedRegion: region }), fetchRegionData(region);
  },
  fetchRegionRes: async () => {
    const { allRegionRes, isLoadingRegions, client } = get();

    if (allRegionRes || isLoadingRegions || !client) return;

    set({ isLoadingRegions: true });

    try {
      const regionListRes = await jsonFetch<RegionListResponse>(
        "https://pokeapi.co/api/v2/region/",
        client
      );

      const regionAllRegionResponses = await Promise.all(
        regionListRes.results.map(async (region) => {
          return jsonFetch<RegionDataResponse>(region.url, client);
        })
      );

      set({ allRegionRes: regionAllRegionResponses, isLoadingRegions: false });
    } catch (error) {
      console.error("Error fetching region data:", error);
      set({ isLoadingRegions: false });
    }
  },

  fetchRegionData: async (regionName: string) => {
    const { fetchRegionRes, allRegionRes, allRegionalData, isLoadingRegions, client } = get();

    if (!allRegionRes) await fetchRegionRes();
    if (!allRegionRes || isLoadingRegions || !client) return;

    const matchedRegion = allRegionRes.find((r) => r.name === regionName);
    const alreadyCached = allRegionalData?.find((r) => r.region === matchedRegion?.name);

    if (!matchedRegion || alreadyCached) return;

    const regionDexResponses = await Promise.all(
      matchedRegion.pokedexes.map((dex) => {
        return jsonFetch<RegionPokeDexResponse>(dex.url, client);
      })
    );
    const regionLocationsResponses = await Promise.all(
      matchedRegion.locations.map((location: ResPointer) => {
        return jsonFetch<RegionLocationResponse>(location.url, client);
      })
    );

    set({
      allRegionalData: [
        ...(allRegionalData || []),
        { region: regionName, locations: regionLocationsResponses, dexes: regionDexResponses },
      ],
    });
  },

  fetchRegionalPokedex: async () => {
    const { allRegionalData, selectedRegion, client } = get();

    if (!allRegionalData || !client) return;

    const regionToBeFetched = allRegionalData.find((r) => r.region === selectedRegion);
    if (!regionToBeFetched || regionToBeFetched.regionalDex) return;

    let pokemonSpeciesResponses = [];

    // For each dex in the region, fetch its pokemon species
    for (const dex of regionToBeFetched.dexes) {
      const dexName = dex.name;
      const dexPokemonSpecies = await Promise.all(
        dex.pokemon_entries.map((entry) => {
          return jsonFetch<PokeDexSpeciesData>(entry.pokemon_species.url, client);
        })
      );
      pokemonSpeciesResponses.push({ title: dexName, dexPokemonSpecies });
    }

    set({
      allRegionalData: allRegionalData.map((regionData) =>
        regionData.region === selectedRegion
          ? { ...regionData, regionalDex: pokemonSpeciesResponses }
          : regionData
      ),
    });
  },

  authorizeUser: async () => {
    const newClient = await initAuth0();
    set({ client: newClient, isAuthenticating: false });

    const isAuth = await newClient?.isAuthenticated();

    if (isAuth) {
      set({ isAuthenticated: true });
    } else {
      newClient?.loginWithRedirect();
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
