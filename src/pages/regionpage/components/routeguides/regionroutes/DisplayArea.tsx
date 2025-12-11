import React from "react";
import { useDataStore } from "../../../../../store";
import { cleanStringAndAbbreviate } from "../../../../../utils/string-helpers.ts";
import { POKEMON_GAME_VERSIONS } from "../../../../../utils/constants.ts";

export default function DisplayArea() {
  const { selectedRegion, selectedGameVersion, selectedArea, selectedCategory } = useDataStore();

  const gameVer = POKEMON_GAME_VERSIONS[selectedGameVersion.replace(/ /g, "")];

  if (!selectedArea?.name) {
      return (
          <div className="flex justify-center  items-center w-7/16">
              <p className="text-gray-400">Select a location to view the map</p>
          </div>
      );
  }

  return (
    <div className="flex justify-center bg-red-200 items-start  w-7/16">
      <img
        className="max-w-full max-h-full"
        src={`/${selectedRegion}_maps_downloaded/${gameVer}/${selectedCategory.id}/${selectedArea.name} ${gameVer}.webp`}
        alt={`Map of ${selectedArea.name}`}
      />
    </div>
  );
}
