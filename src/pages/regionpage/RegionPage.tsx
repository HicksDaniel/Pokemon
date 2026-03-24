import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import "./regionpage.css";
import { useDataStore } from "../../store";
import CustomCarousel from "../../components/carousel/Carousel";
import { useEffect, useMemo, useRef, useState } from "react";
import RenderDexList from "./components/renderpokedex/renderdexlist/RenderDexList";
import RenderPokemonGrid from "./components/renderpokedex/renderpokemongrid/RenderPokemonGrid";
import RegionRoutes from "./components/routeguides/regionroutes/RegionRoutes.tsx";
import LocationsList from "./components/routeguides/locationslist/LocationsList.tsx";
import { renderMapToCanvas, getMapDropdownOptions } from "../../utils/buildOverworld";

type ViewSelection = "info" | "routes" | "pokemon";

export default function RegionPage() {
  const [selection, setSelection] = useState<ViewSelection>("pokemon");
  const { selectedRegion, fetchRegionRes, fetchRegionData, allRegionalData } = useDataStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedMapKey, setSelectedMapKey] = useState<string | null>(null);
  const mapOptions = useMemo(() => getMapDropdownOptions(), []);

  // Re-render when dropdown selection changes
  useEffect(() => {
    if (!selectedMapKey) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    renderMapToCanvas(canvas, selectedMapKey)
      .catch((error) => console.error("Tile test failed:", error));
  }, [selectedMapKey]);



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
        return <div>Regional Info Component</div>;
      case "routes":
        return <RegionRoutes />;
      case "pokemon":
        return <RenderPokemonGrid />;
      default:
        return null;
    }
  };

  // @ts-ignore
  return (
      <div className="flex flex-col h-full overflow-auto">
        <div className="flex flex-col justify-center p-2 gap-2">
          <div className="flex justify-center align-center">Title of Page</div>
          <CustomCarousel />

          <div className="flex justify-center items-center">Region "Intro" goes here</div>

          <div className="flex flex-row w-1/2 justify-evenly self-center mt-1 gap-2">
            <Button
                onClick={() => {
                  setSelection("info");
                  console.log(allRegionalData);
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

        <div className="flex flex-col items-center gap-2 p-4">
          <Dropdown
              value={selectedMapKey}
              onChange={(e) => setSelectedMapKey(e.value)}
              options={mapOptions}
              optionLabel="label"
              optionValue="value"
              placeholder="Select a map"
              filter
              className="w-80"
          />
          <div className="flex flex-row gap-2">
            <button onClick={() => {
              const idx = mapOptions.findIndex((o) => o.value === selectedMapKey);
              if (idx > 0) setSelectedMapKey(mapOptions[idx - 1].value);
            }}>← Prev</button>
            <button onClick={() => {
              const idx = mapOptions.findIndex((o) => o.value === selectedMapKey);
              if (idx < mapOptions.length - 1) setSelectedMapKey(mapOptions[idx + 1].value);
            }}>Next →</button>
          </div>
          <canvas
              ref={canvasRef}
              style={{
                imageRendering: "pixelated",
                border: "1px solid gray",
              }}
          />
        </div>
      </div>
  );
}
