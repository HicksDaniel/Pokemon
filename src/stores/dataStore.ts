import { create } from "zustand";
import type {
  RegionDataResponse,
  RegionListResponse,
  RegionLocationResponse,
  RegionPokeDexResponse,
  NamedAPIResource,
} from "../pages/regionpage/regionpage.ts";
import { jsonFetch } from "../utils/request-helpers";
import { cleanStringAndAbbreviate } from "../utils/string-helpers";
import useAuthStore from "./authStore";

export function getIdFromUrl(url: string) {
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

  return result.replace(/\/+$/, "");
}

export interface RegionalDataDatasets {
  region: string;
  locations: {
    id: string;
    title: string;
    data: { name: string; locData: RegionLocationResponse }[];
  }[];
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

type DataStore = {
  selectedRegion: string;
  selectedDex: string;
  selectedCategory: { id: string; title: string };
  selectedGameVersion: string;
  selectedLocation: { name: string; locData: RegionLocationResponse } | null;
  selectedArea: any;
  selectedEncounter: any;

  setSelectedLocation: (name: string, locData: RegionLocationResponse) => void;
  setSelectedDex: (dex: string) => void;
  setSelectedCategory: (category: { id: string; title: string }) => void;
  setSelectedGameVersion: (version: string) => void;
  setSelectedArea: (area: any) => void;
  setSelectedEncounter: (encounter: any) => void;
  setSelectedAreaByUrl: (url: string) => Promise<void>;
  setSelectedEncounterFromEncounter: (encounter: any) => void;

  allRegionRes: RegionDataResponse[] | null;
  allRegionalData: RegionalDataDatasets[] | null;
  simplePokemonList: SimplePokemon[] | null;
  allPokeDexRes: NamedAPIResource[] | null;
  isLoadingRegions: boolean;

  // Computed/derived state (automatically computed)
  filteredRegion: RegionalDataDatasets | null;
  filteredCategory: { id: string; title: string; data: any[] } | null;

  setAllRegionRes: (data: RegionDataResponse[]) => void;
  setSelectedRegion: (region: string) => void;
  fetchRegionRes: () => Promise<void>;
  fetchRegionData: (region: string) => Promise<void>;
  fetchListOfAllPokemon: () => Promise<void>;
};

const useDataStore = create<DataStore>((set, get) => ({
  selectedRegion: "kanto",
  selectedDex: "",
  selectedCategory: { id: "", title: "" },
  selectedGameVersion: "red",
  selectedLocation: null,
  selectedArea: null,
  selectedEncounter: null,

  allRegionRes: null,
  allRegionalData: null,
  simplePokemonList: null,
  allPokeDexRes: null,
  isLoadingRegions: false,

  // Computed/derived state (initialized as null, updated via getters)
  filteredRegion: null,
  filteredCategory: null,

  setAllRegionRes: (data) => set({ allRegionRes: data }),
  setSelectedDex: (dex: string) => set({ selectedDex: dex }),
  setSelectedLocation: (name, locData) => {
    // Set the location
    set({ selectedLocation: { name, locData } });

    // Automatically initialize selectedArea with the location name
    // This ensures DisplayArea has a name to work with immediately
    set({
      selectedArea: {
        name: cleanStringAndAbbreviate(locData.name)
          .replace(/\b(?:Area|area|Sea|sea)\s*/gi, "")
          .trim(),
        pokemon_encounters: [],
      },
    });
  },
  setSelectedCategory: (category: { id: string; title: string }) => {
    set({ selectedCategory: category });
    // Recompute filteredCategory when category changes
    const state = get();
    const filteredRegion =
      state.allRegionalData?.find((r) => r.region === state.selectedRegion) || null;
    const filteredCategory =
      filteredRegion?.locations.find((c: any) => c.title === category.title) || null;
    set({ filteredRegion, filteredCategory });
  },
  setSelectedGameVersion: (version: string) => set({ selectedGameVersion: version }),
  setSelectedArea: (area: any) => {
    console.log("triggered", area);
    set({ selectedArea: area });
  },
  setSelectedEncounter: (encounter: any) => set({ selectedEncounter: encounter }),

  // Fetch area data by URL and set it
  setSelectedAreaByUrl: async (url: string) => {
    const client = useAuthStore.getState().client;
    if (!client) return;

    try {
      const areaData = await jsonFetch(url, client);
      set({ selectedArea: areaData });
    } catch (error) {
      console.error("Failed to fetch area data:", error);
    }
  },

  // Set selected encounter from encounter object (finds Pokemon in simplePokemonList)
  setSelectedEncounterFromEncounter: (encounter: any) => {
    const { simplePokemonList } = get();
    const pokeId = getIdFromUrl(encounter.pokemon.url);
    const foundPokemon = simplePokemonList?.find((pokemon) => pokemon.id === pokeId);
    set({ selectedEncounter: foundPokemon });
  },

  setSelectedRegion: (region: string) => {
    set({ selectedRegion: region });
    get().setSelectedDex("");
    get().setSelectedCategory({ id: "", title: "" });
    get().fetchRegionData(region);
  },

  fetchRegionRes: async () => {
    const { allRegionRes, isLoadingRegions } = get();
    const client = useAuthStore.getState().client;

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
    } = get();
    const client = useAuthStore.getState().client;

    if (!simplePokemonList) await fetchListOfAllPokemon();
    if (!allRegionRes) await fetchRegionRes();
    if (!allRegionRes || isLoadingRegions || !client || !simplePokemonList) return;

    const matchedRegion = allRegionRes.find((r) => r.name === regionName);
    const alreadyCached = allRegionalData?.find((r) => r.region === matchedRegion?.name);

    if (!matchedRegion || alreadyCached) return;

    const regionDexResponses = await Promise.all(
      matchedRegion.pokedexes.map(async (dex) => {
        return jsonFetch<RegionPokeDexResponse>(dex.url, client);
      })
    );

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
      "black 2",
      "white 2",
      "x",
      "y",
      "omega ruby",
      "alpha sapphire",
      "sun",
      "moon",
      "ultra sun",
      "ultra moon",
      "lets go pikachu",
      "lets go eevee",
      "sword",
      "shield",
      "scarlet",
      "violet",
      "brilliant diamond",
      "shining pearl",
      "legends arceus",
      "legends xy",
    ];

    const featuredGames = regionDexResponses.flatMap((games) =>
      games.version_groups.map((entry) => cleanStringAndAbbreviate(entry.name))
    );
    console.log(featuredGames);

    const matchedTitles = featuredGames.flatMap((game) =>
      VerifiedGameTitles.filter((title) => new RegExp(`\\b${title}\\b`, "i").test(game))
    );

    console.log(matchedTitles);
    const uniqueTitles = Array.from(new Set(matchedTitles));

    const regionLocationsResponses = await Promise.all(
      matchedRegion.locations.map((location: ResPointer) =>
        jsonFetch<RegionLocationResponse>(location.url, client)
      )
    );

    const PopCenterNames = ["city", "town", "village", "cinnabar"];
    const used = new Set();

    const townsAndCities = regionLocationsResponses
      .filter((location) => PopCenterNames.some((sub) => location.name.toLowerCase().includes(sub)))
      .map((location) => {
        used.add(location);
        return { name: cleanStringAndAbbreviate(location.name), locData: location };
      });

    const routes = regionLocationsResponses
      .filter((route) => route.name.toLowerCase().includes("route"))
      .map((route) => {
        used.add(route);
        const cleanRoute = route.name
          .replace(/\b(?:kanto|sea|johto|hoenn|sinnoh|unova|kalos|alola|galar|paldea)\s*/gi, "")
          .replace(/" "/gi, "");
        return { name: cleanStringAndAbbreviate(cleanRoute), locData: route };
      });

    const otherLocations = regionLocationsResponses
      .filter((location) => !used.has(location))
      .map((location) => ({ name: cleanStringAndAbbreviate(location.name), locData: location }));

    const matchedPokemon = regionDexResponses.map((dex) => {
      const missingPokemon: string[] = [];
      const dexEntries = dex.pokemon_entries.map((entry) => {
        const pokemonId = getIdFromUrl(entry.pokemon_species.url);
        const found = simplePokemonList.find((pokemon) => pokemon.id === pokemonId);
        if (!found) missingPokemon.push(entry.pokemon_species.name);
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

    set({
      allRegionalData: [
        ...(allRegionalData || []),
        {
          region: regionName,
          featuredGames: uniqueTitles,
          locations: [
            { id: "cities", title: "Cities & Towns", data: townsAndCities },
            { id: "routes", title: "Routes", data: routes },
            { id: "other", title: "Other", data: otherLocations },
          ],
          dexes: regionDexResponses,
          regionalDex: matchedPokemon,
        },
      ],
    });
  },

  fetchListOfAllPokemon: async () => {
    const client = useAuthStore.getState().client;
    if (!client) return;

    try {
      const typeList = await jsonFetch<{ results: ResPointer[] }>(
        "https://pokeapi.co/api/v2/type/?limit=100000&offset=0",
        client
      );

      const typeDetailsList = await Promise.all(
        typeList.results.map((type) => jsonFetch<any>(type.url, client))
      );

      const entries = typeDetailsList.flatMap((typeData) =>
        typeData.pokemon.map((dexEntry: any) => {
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

      const byId = entries.reduce<Record<number, any>>((acc, e) => {
        const { id, name, url, images, cries } = e;
        if (!acc[id]) {
          acc[id] = { id, name, url, images, cries, types: { type1: null, type2: null } };
        }
        acc[id].types[`type${e.slot}`] = e.typeName;
        return acc;
      }, {});

      set({ simplePokemonList: Object.values(byId) });
    } catch (error) {
      console.error("Failed to fetch Pokémon list:", error);
    }
  },
}));

export default useDataStore;
