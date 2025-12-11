import { cleanStringAndAbbreviate } from "../../../../../utils/string-helpers.ts";
import SimplePokemonCard from "../../../../../utils/SimplePokemonCard.tsx";
import { useDataStore } from "../../../../../store";
import type { Encounter } from "../../../regionpage.ts";
import AreaSelector from "./AreaSelector.tsx";
import {GameVersionLabel} from "./GameVersionLabel.tsx";
import {EncounterTable} from "./EncounterTable.tsx";


export default function RouteDetails() {
  const {
    selectedGameVersion,
    selectedLocation,
    selectedArea,
    selectedEncounter,
    setSelectedAreaByUrl,
    setSelectedEncounterFromEncounter,
  } = useDataStore();

  if (!selectedLocation) return null;



  return (
    <div className="flex w-6/16 flex-col gap-4 overflow-auto">
      <div className="text-center font-bold">{selectedLocation.name}</div>

      <AreaSelector
          areas={selectedLocation.locData.areas}
          selectedArea={selectedArea}
          onSelectArea={setSelectedAreaByUrl}
      />
      {selectedArea && (
          <>
            <GameVersionLabel version={selectedGameVersion} />
            <EncounterTable
                encounters={selectedArea.pokemon_encounters}
                selectedVersion={selectedGameVersion}
            />
          </>
      )}

      {selectedEncounter && (
        <SimplePokemonCard pokemon={selectedEncounter}  />
      )}
    </div>
  );
}
