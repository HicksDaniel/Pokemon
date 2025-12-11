import "./renderdexlist.css";

import { useDataStore } from "../../../../../store";
import { cleanStringAndAbbreviate } from "../../../../../utils/string-helpers";

import { Button } from "primereact/button";
import { Badge } from "primereact/badge";

export default function RenderRegionDexList() {
  const { selectedRegion, allRegionalData, simplePokemonList, setSelectedDex, selectedDex } =
    useDataStore();

  if (!simplePokemonList || !allRegionalData || !selectedRegion) return null;

  const pokeDexSelected = allRegionalData.find((r) => r.region === selectedRegion);

  if (!pokeDexSelected?.regionalDex) return null;

  console.log(pokeDexSelected.regionalDex);

  return (
    <div className="dex-list-container">
      {pokeDexSelected.regionalDex.map((dex) => (
        <div className="dex-item" key={dex.title}>
          <Button
            outlined={selectedDex !== dex.title}
            className="dex-button "
            onClick={() => setSelectedDex(dex.title)}
          >
            {cleanStringAndAbbreviate(dex.title)}
          </Button>
          <Badge className="dex-badge" value={dex.dexPokemonSpecies.length} />
        </div>
      ))}
    </div>
  );
}
