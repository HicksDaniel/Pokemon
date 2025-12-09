import useStore from "../../../../store";
import { getIdFromUrl } from "../../../../store";
import { useState } from "react";
import { ListBox } from "primereact/listbox";
import { cleanStringAndAbbreviate } from "../../../../utils/string-helpers";
import createSimplePokemonCard from "../../../../utils/simplePokeCard";
import { jsonFetch } from "../../../../utils/request-helpers";
import { create } from "zustand";

export default function RenderPokemonRoutes() {
  const {
    selectedRegion,
    allRegionalData,
    selectedCategory,
    client,
    simplePokemonList,
    selectedGameVersion,
    setSelectedGameVersion,
  } = useStore();
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [selectedArea, setSelectedArea] = useState<any>(null);
  const [selectedEncounter, setSelectedEncounter] = useState<any>(null);

  if (!allRegionalData || !selectedRegion || !selectedCategory) return null;

  const locationCategory = allRegionalData
    .find((r) => r.region === selectedRegion)
    ?.locations.find((c) => c.title === selectedCategory);

  if (!locationCategory?.data) return null;

  const array = [
    ...locationCategory.data.map((item) => ({
      name: item.name,
      code: item.name,
      locData: item.locData,
    })),
  ];

  const handlePokemonFetch = async (url: string) => {
    if (!client) return;
    const areaData = await jsonFetch(url, client);
    console.log(areaData);
    setSelectedArea(areaData);
  };

  const handleSelectedEncounter = (encounter: any) => {
    const pokeId = getIdFromUrl(encounter.pokemon.url);

    const foundPokemon = simplePokemonList?.find((pokemon) => pokemon.id === pokeId);
    setSelectedEncounter(foundPokemon);
  };

  const selectedAreaImage =
    selectedArea &&
    cleanStringAndAbbreviate(selectedArea?.name).replace(/\b(?:Area|area)\s*/gi, "");

  console.log(selectedAreaImage);

  return (
    <div className="flex w-full h-[830px] flex-row overflow-hidden gap-1 scroll-bar-hidden">
      <div className="flex w-3/16 flex-col gap-4 overflow-auto">
        <div className="text-center"> {selectedCategory}</div>
        <div className="text-center"> {array.length} Locations</div>
        <div className=" h-full overflow-auto">
          {array.map((location, i) => (
            <div
              className="pl-3"
              onClick={() => setSelectedLocation(location)}
              key={location.name + i}
            >
              {location.name}
            </div>
          ))}
        </div>
      </div>
      {selectedLocation ? (
        <div className="flex w-6/16 flex-col gap-4 overflow-auto">
          <div className="text-center"> {selectedLocation.name}</div>
          <div className="text-center">
            {selectedLocation.locData.areas.map((areas) => (
              <div onClick={() => handlePokemonFetch(areas.url)} key={areas.name}>
                {cleanStringAndAbbreviate(areas.name)}
              </div>
            ))}
          </div>

          <div>
            Select Version : {selectedGameVersion}
            {selectedArea?.pokemon_encounters.map((encounter) => (
              <div key={encounter.pokemon.name}>
                {encounter.version_details.map(
                  (version) => version.version.name === selectedGameVersion
                )}
              </div>
            ))}
          </div>

          <table>
            <thead>
              <tr>
                <th>Pokemon</th>
                <th>Catch Change</th>
              </tr>
            </thead>

            <tbody>
              {selectedArea?.pokemon_encounters.map((encounter) => {
                return (
                  <tr
                    onClick={() => handleSelectedEncounter(encounter)}
                    key={encounter.pokemon.name}
                  >
                    <td>{cleanStringAndAbbreviate(encounter.pokemon.name)}</td>
                    <td>
                      <div>
                        {encounter.version_details.map((version) => {
                          if (version.version.name === selectedGameVersion) {
                            return (
                              <div key={version.version.name}>
                                <div>{version.max_chance}</div>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
      <div className="flex justify-center items-center  w-7/16">
        <img
          className="h-auto w-full"
          src="/kanto_maps_downloaded/RBY/Pokemon Mansion 1F RBY.webp"
          //   src={`/${selectedRegion}_maps_downloaded/RBY/${selectedAreaImage} RBY.webp`}
        />
      </div>
    </div>
  );
}
