import "./renderpokemongrid.css";

import { useDataStore } from "../../../../../store";
import createSimplePokemonCard from "../../../../../utils/SimplePokemonCard.tsx";
export default function RenderPokemonGrid() {
  const { selectedRegion, allRegionalData, selectedDex } = useDataStore();

  if (!allRegionalData || !selectedRegion || !selectedDex) return null;

  const pokeDexSelected = allRegionalData.find((r) => r.region === selectedRegion);
  const selectedDexData = pokeDexSelected?.regionalDex?.find((dex) => dex.title === selectedDex);

  if (!selectedDexData) return null;

  return (
    <div className="pokemon-grid">
      {selectedDexData?.dexPokemonSpecies?.map((pokemon) => {
        return createSimplePokemonCard(pokemon);
      })}
    </div>
  );
}
