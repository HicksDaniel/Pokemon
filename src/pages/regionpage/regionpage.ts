export interface NamedAPIResource {
  name: string;
  url: string;
}

// Alias used throughout region interfaces
export type ResPointer = NamedAPIResource;

export interface EncounterDetail {
  method: NamedAPIResource;
  min_level: number;
  max_level: number;
  chance: number;
  condition_values: NamedAPIResource[];
  // If condition_values items have additional fields, you may extend accordingly.
}

export interface VersionDetail {
  version: NamedAPIResource;
  max_chance: number;
  encounter_details: EncounterDetail[];
}

export interface Encounter {
  pokemon: NamedAPIResource;
  version_details: VersionDetail[];
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
  version_groups: ResPointer[];
}
