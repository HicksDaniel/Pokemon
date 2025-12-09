import { Button } from "primereact/button";

import "./regionpage.css";
import useStore from "../../store";
import CustomCarousel from "../../components/carousel/Carousel";
import { useEffect, useState } from "react";
import RenderDexList from "./components/renderpokedex/renderdexlist/RenderDexList";
import RenderPokemonGrid from "./components/renderpokedex/renderpokemongrid/RenderPokemonGrid";
import RegionRoutes from "./components/routeguides/regionroutes/RegionRoutes.tsx";
import LocationsList from "./components/routeguides/locationslist/LocationsList.tsx";

type ViewSelection = "info" | "routes" | "pokemon";

export default function RegionPage() {
  const [selection, setSelection] = useState<ViewSelection>("pokemon");
  const { selectedRegion, fetchRegionRes, fetchRegionData, allRegionalData } = useStore();

  useEffect(() => {
    const initializeRegionPage = async () => {
      await fetchRegionRes();
      await fetchRegionData(selectedRegion);
    };
    initializeRegionPage();
  }, [fetchRegionRes, fetchRegionData, selectedRegion]);

  const renderSelectedView = () => {
    switch (selection) {
      case "info":
        return <div>Regional Info Component</div>; // Replace with actual component
      case "routes":
        return <RegionRoutes />;
      case "pokemon":
        return <RenderPokemonGrid />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full overflow-auto">
      <div className="flex flex-col justify-center p-2 gap-2">
        <div className="flex justify-center align-center ">Title of Page</div>
        <CustomCarousel />
        test
        <div className="flex justify-center items-center ">Region "Intro" goes here</div>

        <div className="flex flex-row w-1/2 justify-evenly self-center mt-1 gap-2 ">
          <Button
            onClick={() => {
              setSelection("info"), console.log(allRegionalData);
            }}
            label="Regional Info"
            icon="pi pi-info-circle"
            outlined={selection !== "info"}
          />
          <Button
            onClick={() => setSelection("routes")}
            label="Route Guide"
            icon="pi pi-map"
            outlined={selection !== "routes"}
          />
          <Button
            onClick={() => setSelection("pokemon")}
            label="Regional Pokemon"
            icon="pi pi-globe"
            outlined={selection !== "pokemon"}
          />
        </div>
        {selection === "pokemon" ? <RenderDexList /> : null}
        {selection === "routes" ? <LocationsList /> : null}
      </div>
      <>{renderSelectedView()}</>
    </div>
  );
}
