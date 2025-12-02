import { Button } from "primereact/button";

import "./regionpage.css";
import useStore from "../../store";
import CustomCarousel from "../../components/carousel/Carousel";
import { Badge } from "primereact/badge";
import { useState } from "react";

export default function RegionPage() {
  const { selectedRegion, allRegionalData, fetchRegionalPokedex } = useStore();
  const [selectedDex, setSelectedDex] = useState("");

  const RenderRegionDexList = () => {
    if (!allRegionalData) return null;

    const pokeDexSelected = allRegionalData.find((r) => r.region === selectedRegion);

    if (!pokeDexSelected?.regionalDex) return null;

    return pokeDexSelected.regionalDex.map((dex) => (
      <>
        <div key={dex.title}>
          <div className="flex flex-col justify-center gap-2 items-center">
            <Button onClick={() => setSelectedDex(dex.title)}>{dex.title}</Button>
            <Badge className="w-1/2" value={dex.dexPokemonSpecies.length} />
          </div>
        </div>
      </>
    ));
  };

  const RenderSelectedDex = () => {
    if (!allRegionalData) return null;

    const pokeDexSelected = allRegionalData.find((r) => r.region === selectedRegion);

    if (!pokeDexSelected?.regionalDex) return null;

    const selectedDexData = pokeDexSelected.regionalDex.find((dex) => dex.title === selectedDex);

    if (!selectedDexData) return null;

    return selectedDexData.dexPokemonSpecies.map((pokemon) => (
      <div className="flex flex-col justify-center  items-center h-[5rem]" key={pokemon.name}>
        <p>{pokemon.id}</p>
        {pokemon.name}
      </div>
    ));
  };

  return (
    <div className="flex flex-col h-screen justify-start p-4 gap-4">
      <div className="flex justify-center align-center h-1/16">Title of Page</div>

      <div className="flex justify-center h-9/16">
        <CustomCarousel />
      </div>

      <div className="flex justify-center items-center h-1/16">Region "Intro" goes here</div>
      <div className="flex flex-row justify-center gap-2 h-1/16">
        <Button
          onClick={() => console.log(allRegionalData)}
          className="w-1/4"
          label="Route Guide"
          icon="pi pi-map"
        />
        <Button className="w-1/4" label="Regional Info" icon="pi pi-info-circle" />
        <Button
          onMouseEnter={() => fetchRegionalPokedex(selectedRegion)}
          onClick={() => RenderRegionDexList()}
          className="w-1/4"
          label="Regional Pokemon"
          icon="pi pi-globe"
        />
      </div>
      <div className="flex flex-row justify-center gap-4 ">{RenderRegionDexList()}</div>
      <div className="grid grid-cols-4 gap-3 ">{RenderSelectedDex()}</div>
    </div>
  );
}
