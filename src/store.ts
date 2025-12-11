// Re-export from individual stores for backward compatibility
export { default as useAuthStore } from "./stores/authStore";
export { default as useDataStore, getIdFromUrl } from "./stores/dataStore";
export { default as useThemeStore, themeFamily } from "./stores/themeStore";

// Re-export types
export type { RegionalDataDatasets, SimplePokemon } from "./stores/dataStore";
