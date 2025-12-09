import {cleanStringAndAbbreviate} from "../../../../../utils/string-helpers.ts";
import createSimplePokemonCard from "../../../../../utils/simplePokeCard.tsx";
import useStore, {getIdFromUrl} from "../../../../../store.ts";
import {jsonFetch} from "../../../../../utils/request-helpers.ts";
import {useState} from "react";

export default function RouteDetails() {
    const {
        selectedGameVersion,
        selectedRegion,
        client,
        selectedLocation

    } = useStore();

    const versionSelection = {
        red: "RBY",
        blue: "RBY",
        yellow: "RBY",
        gold: "GSC",
        silver: "GSC",
        crystal: "GSC",
        firered: "FRLG",
        leafgreen: "FRLG"
    };

    const [selectedArea, setSelectedArea] = useState<any>(null);
    const [selectedEncounter, setSelectedEncounter] = useState<any>(null);

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
    }


    const selectedAreaImage =
        selectedArea &&
        cleanStringAndAbbreviate(selectedArea?.name).replace(/\b(?:Area|area|Sea|sea)\s*/gi, "").trim();

    console.log(selectedArea)

    const gameVer = versionSelection[selectedGameVersion]

    if (!selectedLocation) return null;

    return  (
        <>

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
                                    test
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                {selectedEncounter && createSimplePokemonCard(selectedEncounter)}
            </div>
    <div className="flex justify-center items-center  w-7/16">
        <img
            className="h-auto w-full"
            src={`/${selectedRegion}_maps_downloaded/${gameVer}/routes/${selectedAreaImage} ${gameVer}.webp`}
        />
    </div>
        </>
  )
}