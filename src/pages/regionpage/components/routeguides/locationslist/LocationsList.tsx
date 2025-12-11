import { useDataStore } from "../../../../../store";
import "./locationslist.css";
import { cleanStringAndAbbreviate } from "../../../../../utils/string-helpers.ts";
import { jsonFetch } from "../../../../../utils/request-helpers.ts";

import { Button } from "primereact/button";
import { Badge } from "primereact/badge";

export default function LocationsList() {
  const {
    selectedRegion,
    allRegionalData,
    simplePokemonList,
    setSelectedCategory,
    selectedCategory,
    setSelectedGameVersion,
 
  } = useDataStore();


  if (!simplePokemonList || !allRegionalData || !selectedRegion) return null;

  const locationsSelected = allRegionalData.find((r) => r.region === selectedRegion);

  if (!locationsSelected?.locations) return null;

  const fullFeaturesGames =
    selectedRegion === "kanto"
      ? [
          "red",
          "blue",
          "yellow",
          "gold",
          "silver",
          "crystal",
          "firered",
          "leafgreen",
          "heartgold",
          "soulsilver",
          "lets go pikachu",
          "lets go eevee",
        ]
      : locationsSelected.featuredGames;


  return (
    <>
      <div className="text-center">Featured Games</div>

      <div className="flex flex-row justify-center gap-5">
        {fullFeaturesGames.map((game) => (
          <Button onClick={() => setSelectedGameVersion(game)} size="small" key={game}>
            {cleanStringAndAbbreviate(game)}
          </Button>
        ))}
      </div>

      <div className="render-location-list">
        {locationsSelected.locations.map((category) => (
          <div className="dex-item" key={category.title}>
            <Button
              outlined={selectedCategory !== category.title}
              className="dex-button "
              onClick={() => setSelectedCategory(category)}
            >
              {cleanStringAndAbbreviate(category.title)}
            </Button>
            <Badge className="dex-badge" value={category.data.length} />
          </div>
        ))}
      </div>
    </>
  );
}
