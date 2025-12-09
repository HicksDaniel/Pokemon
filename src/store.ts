import { create } from "zustand";
import { initAuth0 } from "./AuthProvider/Authorization";
import type {
  RegionDataResponse,
  RegionListResponse,
  RegionLocationResponse,
  RegionPokeDexResponse,
  ResPointer,
} from "./pages/regionpage/regionpage.ts";
import { jsonFetch } from "./utils/request-helpers";
import { cleanStringAndAbbreviate } from "./utils/string-helpers";

export function getIdFromUrl(url) {
  let result = url;
  const pokemonPrefix = "https://pokeapi.co/api/v2/pokemon/";
  const typePrefix = "https://pokeapi.co/api/v2/type/";
  const speciesPrefix = "https://pokeapi.co/api/v2/pokemon-species/";

  if (result.startsWith(pokemonPrefix)) {
    result = result.replace(pokemonPrefix, "");
  } else if (result.startsWith(typePrefix)) {
    result = result.replace(typePrefix, "");
  } else if (result.startsWith(speciesPrefix)) {
    result = result.replace(speciesPrefix, "");
  }

  // https://pokeapi.co/api/v2/pokemon-species/

  return result.replace(/\/+$/, "");
}

export interface RegionalDataDatasets {
  region: string;
  locations: [{ title: string; data: { name: string; locData: RegionLocationResponse }[] }];
  dexes: RegionPokeDexResponse[];
  displayDex?: SimplePokemon[][];
  regionalDex?: { title: string; dexPokemonSpecies: (SimplePokemon | undefined)[] }[];
  featuredGames: string[];
}

export type SimplePokemon = {
  id: string;
  name: string;
  url: string;
  imageUrl: string;
  cries: { latest: string; legacy: string };
  types: { type1: string | null; type2: string | null };
};

type Store = {
  client: any;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  authorizeUser: () => Promise<void>;
  selectedRegion: string;
  selectedDex: string;
  selectedCategory: string;
  selectedGameVersion: string;

  setSelectedDex: (dex: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedGameVersion: (version: string) => void;
  // Region data
  allRegionRes: RegionDataResponse[] | null;
  allRegionalData: RegionalDataDatasets[] | null;
  simplePokemonList: SimplePokemon[] | null;
  allPokeDexRes: ResPointer[] | null;
  isLoadingRegions: boolean;
  setAllRegionRes: (data: RegionDataResponse[]) => void;
  setSelectedRegion: (region: string) => void;
  fetchRegionRes: () => Promise<void>;
  fetchRegionData: (region: string) => Promise<void>;
  // fetchRegionalPokedex: (region: string) => Promise<void>;
  fetchListOfAllPokemon: () => Promise<void>;
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
  selectedRegion: "kanto",
  selectedDex: "",
  selectedCategory: "",
  selectedGameVersion: "red", // Default to red version for now

  // Region data
  allRegionRes: null,
  allRegionalData: null,
  simplePokemonList: null,
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
  setSelectedDex: (dex: string) => set({ selectedDex: dex }),
  setSelectedCategory: (category: string) => set({ selectedCategory: category }),
  setSelectedGameVersion: (version: string) => set({ selectedGameVersion: version }), // Set the selected game version to the provided version string.
  setSelectedRegion: (region: string) => {
    set({ selectedRegion: region }),
      get().setSelectedDex(""),
      get().setSelectedCategory(""),
      get().fetchRegionData(region);
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
    const {
      fetchRegionRes,
      allRegionRes,
      allRegionalData,
      simplePokemonList,
      isLoadingRegions,
      fetchListOfAllPokemon,
      client,
    } = get();

    if (!simplePokemonList) await fetchListOfAllPokemon();

    if (!allRegionRes) await fetchRegionRes();
    if (!allRegionRes || isLoadingRegions || !client || !simplePokemonList) return;

    const matchedRegion = allRegionRes.find((r) => r.name === regionName);
    const alreadyCached = allRegionalData?.find((r) => r.region === matchedRegion?.name);

    if (!matchedRegion || alreadyCached) return;

    const regionDexResponses = await Promise.all(
      matchedRegion.pokedexes.map(async (dex) => {
        const dexResponses = await jsonFetch<RegionPokeDexResponse>(dex.url, client);
        const dexData = dexResponses;

        return dexData;
      })
    );

    console.log("regionDexResponses", regionDexResponses);

    const VerifiedGameTitles = [
      "red",
      "blue",
      "yellow",
      "gold",
      "silver",
      "crystal",
      "ruby",
      "sapphire",
      "emerald",
      "firered",
      "leafgreen",
      "diamond",
      "pearl",
      "platinum",
      "heartgold",
      "soulsilver",
      "black",
      "white",
      "black-2",
      "white-2",
      "x",
      "y",
      "omega-ruby",
      "alpha-sapphire",
      "sun",
      "moon",
      "ultra-sun",
      "ultra-moon",
      "sword",
      "shield",
      "brilliant-diamond",
      "shining-pearl",
      "legends-arceus",
      "legends-xy",
    ];

    const featuredGames = regionDexResponses.flatMap((games) =>
      games.version_groups.map((entry) => cleanStringAndAbbreviate(entry.name))
    );

    const matchedTitles = featuredGames.flatMap((game) =>
      VerifiedGameTitles.filter((title) => {
        const regex = new RegExp(`\\b${title}\\b`, "i");
        return regex.test(game);
      })
    );
    const uniqueTitles = Array.from(new Set(matchedTitles));

    const regionLocationsResponses = await Promise.all(
      matchedRegion.locations.map((location: ResPointer) => {
        return jsonFetch<RegionLocationResponse>(location.url, client);
      })
    );

    const PopCenterNames = ["city", "town", "village", "cinnabar"];
    const used = new Set();

    const townsAndCities = regionLocationsResponses
      .filter((location) => PopCenterNames.some((sub) => location.name.toLowerCase().includes(sub)))
      .map((location) => {
        used.add(location);
        return {
          name: cleanStringAndAbbreviate(location.name),
          locData: location,
        };
      });

    const routes = regionLocationsResponses
      .filter((route) => route.name.toLowerCase().includes("route"))
      .map((route) => {
        used.add(route);
        const cleanRoute = route.name
          .replace(/\b(?:kanto|sea|johto|hoenn|sinnoh|unova|kalos|alola|galar|paldea)\s*/gi, "")
          .replace(/" "/gi, "");

        return {
          name: cleanStringAndAbbreviate(cleanRoute),
          locData: route,
        };
      });

    const otherLocations = regionLocationsResponses
      .filter((location) => !used.has(location))
      .map((location) => ({
        name: cleanStringAndAbbreviate(location.name),
        locData: location,
      }));

    const matchedPokemon = regionDexResponses.map((dex) => {
      const missingPokemon: string[] = [];

      const dexEntries = dex.pokemon_entries.map((entry) => {
        const pokemonId = getIdFromUrl(entry.pokemon_species.url);
        const found = simplePokemonList.find((pokemon) => pokemon.id === pokemonId);

        if (!found) {
          missingPokemon.push(entry.pokemon_species.name);
        }
        return found;
      });

      if (missingPokemon.length > 0) {
        console.warn(
          `Dex "${dex.name}" - Missing ${missingPokemon.length} Pokemon:`,
          missingPokemon
        );
      }

      return { title: dex.name, dexPokemonSpecies: dexEntries };
    });
    // console.log("matchedPokemon", matchedPokemon);
    // console.timeEnd("matchedPokemon");
    console.log(featuredGames);
    set({
      allRegionalData: [
        ...(allRegionalData || []),
        {
          region: regionName,
          featuredGames: uniqueTitles,
          locations: [
            {
              title: "Towns and Cities",
              data: townsAndCities,
            },
            {
              title: "routes",
              data: routes,
            },
            {
              title: "Other Locations",
              data: otherLocations,
            },
          ],
          dexes: regionDexResponses,
          regionalDex: matchedPokemon,
        },
      ],
    });
  },

  fetchListOfAllPokemon: async () => {
    const { client } = get();
    if (!client) return;

    try {
      // Fetch all types
      const typeList = await jsonFetch<ResPointer[]>(
        "https://pokeapi.co/api/v2/type/?limit=100000&offset=0",
        client
      );

      // Fetch details for all types in parallel
      const typeDetailsList = await Promise.all(
        typeList.results.map((type) => jsonFetch(type.url, client))
      );

      // Extract and flatten all Pokémon entries (one per type reference)
      const entries = typeDetailsList.flatMap((typeData) =>
        typeData.pokemon.map((dexEntry) => {
          const id = getIdFromUrl(dexEntry.pokemon.url);
          const name = dexEntry.pokemon.name;

          return {
            id,
            name,
            url: dexEntry.pokemon.url,
            images: {
              default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
              dreamWorld: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
              official: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
              showdownGif: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${name}.gif`,
            },
            cries: {
              latest: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`,
              legacy: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/${id}.ogg`,
            },
            slot: dexEntry.slot,
            typeName: typeData.name,
          };
        })
      );

      // Merge entries by Pokémon ID to accumulate types
      const byId = entries.reduce<Record<number, any>>((acc, e) => {
        const { id, name, url, images, cries } = e;
        if (!acc[id]) {
          acc[id] = {
            id,
            name,
            url,
            images,
            cries,
            types: { type1: null, type2: null },
          };
        }
        acc[id].types[`type${e.slot}`] = e.typeName;
        return acc;
      }, {});

      const allPokemon = Object.values(byId);

      set({
        simplePokemonList: allPokemon,
      });
    } catch (error) {
      console.error("Failed to fetch Pokémon list:", error);
      // optionally: set some error state, or retry, etc.
    }
  },

  authorizeUser: async () => {
    console.log("auth running")



    const newClient = await initAuth0();
    set({ client: newClient, isAuthenticating: false })

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
