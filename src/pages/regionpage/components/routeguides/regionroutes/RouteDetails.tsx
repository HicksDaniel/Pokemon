import { cleanStringAndAbbreviate } from "../../../../../utils/string-helpers.ts";
import createSimplePokemonCard from "../../../../../utils/simplePokeCard.tsx";
import { useDataStore } from "../../../../../store";
import type { Encounter } from "../../../../../pages/regionpage/regionpage.ts";

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

  const hasMultipleAreas = selectedLocation.locData.areas.length > 1;

  return (
    <div className="flex w-6/16 flex-col gap-4 overflow-auto">
      <div className="text-center font-bold">{selectedLocation.name}</div>

      {hasMultipleAreas && (
        <div className="text-center">
          <div className="text-sm mb-2">Select Area:</div>
          {selectedLocation.locData.areas.map((area: any) => (
            <div
              onClick={() => setSelectedAreaByUrl(area.url)}
              key={area.name}
              className={`cursor-pointer p-2 hover:bg-gray-700 ${
                selectedArea?.name === area.name ? "bg-gray-600" : ""
              }`}
            >
              {cleanStringAndAbbreviate(area.name)}
            </div>
          ))}
        </div>
      )}

      {selectedArea?.pokemon_encounters && (
        <>
          <div className="text-sm text-center">Game Version: {selectedGameVersion}</div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2">Pokemon</th>
                <th className="text-left p-2">Catch Chance</th>
              </tr>
            </thead>
            <tbody>
              {selectedArea.pokemon_encounters.map((encounter: Encounter) => {
                return (
                  <tr
                    onClick={() => setSelectedEncounterFromEncounter(encounter)}
                    key={encounter.pokemon.name}
                    className="cursor-pointer hover:bg-gray-700"
                  >
                    <td className="p-2">{cleanStringAndAbbreviate(encounter.pokemon.name)}</td>
                    <td className="p-2">
                      {encounter.version_details.map((version) => {
                        if (version.version.name === selectedGameVersion) {
                          return <div key={version.version.name}>{version.max_chance}%</div>;
                        }
                        return null;
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}

      {selectedEncounter && (
        <div className="mt-4">{createSimplePokemonCard(selectedEncounter)}</div>
      )}
    </div>
  );
}
