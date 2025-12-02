import { Button } from "primereact/button";

import "./regionpage.css";
import useStore from "../../store";
import CustomCarousel from "../../components/carousel/Carousel";

export default function RegionPage() {
  const { selectedRegion, allRegionalData, fetchRegionalPokedex } = useStore();

  const renderList = () => {
    if (!allRegionalData) return;

    const pokeDexSelected = allRegionalData.find((r) => r.region === selectedRegion);

    if (!pokeDexSelected?.regionalDex) return;

    pokeDexSelected.regionalDex.forEach((dex) => {
      console.log(`${dex.title}:`, dex.dexPokemonSpecies.length, "pokemon");
      dex.dexPokemonSpecies.forEach((pokemon) => {
        console.log(`- ${pokemon.name}`);
      });
    });
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
          onClick={() => renderList()}
          className="w-1/4"
          label="Regional Pokemon"
          icon="pi pi-globe"
        />
      </div>
      <div> </div>
    </div>
  );
}
