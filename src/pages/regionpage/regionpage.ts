import useStore from "../../store";

export interface ResPointer {
  name: string;
  url: string;
  message: string;
}

export interface RegionListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ResPointer[];
}

export interface RegionDataResponse {
  id: number;
  name: string;
  locations: ResPointer[];
  names: {
    language: ResPointer;
    name: string;
  }[];
  main_generation: ResPointer;
  pokedexes: ResPointer[];
  version_groups: ResPointer[];
}

export interface RegionLocationResponse {
  title: string;
  areas: ResPointer[];
  game_indices: {
    game_index: number;
    generation: ResPointer;
  }[];
  id: number;
  name: string;
  names: {
    language: ResPointer;
    name: string;
  }[];
  region: ResPointer;
}

export interface RegionPokeDexResponse {
  descriptions: {
    description: string;
    language: ResPointer;
  }[];
  id: number;
  is_main_series: boolean;
  name: string;
  names: {
    language: ResPointer;
    name: string;
  }[];
  pokemon_entries: {
    entry_number: number;
    pokemon_species: ResPointer;
  }[];
  region: ResPointer;
}
