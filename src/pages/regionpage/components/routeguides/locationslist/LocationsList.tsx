import useStore from "../../../../../store.ts";
import "./locationslist.css";
import { cleanStringAndAbbreviate } from "../../../../../utils/string-helpers.ts";

import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import { useState } from "react";

export default function LocationsList() {
  const {
    selectedRegion,
    allRegionalData,
    simplePokemonList,
    setSelectedCategory,
    selectedCategory,
    setSelectedGameVersion,
    selectedGameVersion,
  } = useStore();

  if (!simplePokemonList || !allRegionalData || !selectedRegion) return null;

  const locationsSelected = allRegionalData.find((r) => r.region === selectedRegion);

  if (!locationsSelected?.locations) return null;

  return (
    <>
      <div className="text-center">Featured Games</div>
      <div className="flex flex-row justify-center gap-5">
        {locationsSelected.featuredGames.map((game) => (
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
              onClick={() => setSelectedCategory(category.title)}
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
