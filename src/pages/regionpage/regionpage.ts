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

export interface PokeDexSpeciesData {
  base_happiness: number;
  capture_rate: number;
  color: ResPointer;
  egg_groups: ResPointer[];
  evolution_chain: ResPointer;
  evolves_from_species: ResPointer | null;
  flavor_text_entries: {
    flavor_text: string;
    language: ResPointer;
    version: ResPointer;
  }[];
  form_descriptions: {
    description: string;
    language: ResPointer;
  }[];
  form_names: {
    language: ResPointer;
    name: string;
  }[];
  gender_rate: number;
  genera: {
    genus: string;
    language: ResPointer;
  }[];
  generation: ResPointer;
  growth_rate: ResPointer;
  habitat: ResPointer | null;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: {
    language: ResPointer;
    name: string;
  }[];
  order: number;
  pal_park_encounters: {
    area: ResPointer;
    base_score: number;
    rate: number;
  }[];
  pokedex_numbers: {
    entry_number: number;
    pokedex: ResPointer;
  }[];
  shape: ResPointer;
  varieties: {
    is_default: boolean;
    pokemon: ResPointer;
  }[];
}
