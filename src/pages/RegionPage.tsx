import { Button } from "primereact/button";
import { useState } from "react";

export default function RegionPage() {
  const REGIONAL_ARTWORK = [
    { id: "kanto", name: "Kanto", img: "/images/Region Artwork/Kanto_Map.webp" },
    { id: "johto", name: "Johto", img: "/images/Region Artwork/Johto_Map.webp" },
    { id: "hoenn", name: "Hoenn", img: "/images/Region Artwork/Hoenn_Map.webp" },
    { id: "sinnoh", name: "Sinnoh", img: "/images/Region Artwork/Sinnoh_Map.webp" },
    { id: "unova", name: "Unova", img: "/images/Region Artwork/Unova_Map.webp" },
    { id: "kalos", name: "Kalos", img: "/images/Region Artwork/Kalos_Map.webp" },
    { id: "alola", name: "Alola", img: "/images/Region Artwork/Alola_Map.webp" },
    { id: "galar", name: "Galar", img: "/images/Region Artwork/Galar_Map.webp" },
    { id: "paldea", name: "Paldea", img: "/images/Region Artwork/Paldea_Map.webp" },
  ];

  const CustomCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
      <>
        <div className="flex flex-col justify-center items-center h-7/16">
          <div className="flex items-center justify-center h-6/8">
            <img
              className="flex h-full justify-center align-center"
              src={REGIONAL_ARTWORK[currentIndex].img}
            />
          </div>

          <div className="flex flex-row justify-center items-center h-2/8 gap-2">
            {REGIONAL_ARTWORK.map((region) => {
              return (
                <div
                  onClick={() => setCurrentIndex(REGIONAL_ARTWORK.indexOf(region))}
                  className={`flex flex-col text-center opacity-50 justify-between w-1/8 h-7/8 ${
                    currentIndex === REGIONAL_ARTWORK.indexOf(region)
                      ? "border-2 border-blue opacity-100"
                      : ""
                  }`}
                >
                  <div className="flex justify-center items-center">
                    <img
                      className="h-7/8"
                      src={region.img}
                    />
                  </div>
                  <p>{region.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col h-screen flex justify-start p-4 gap-4">
      <div className="flex justify-center align-center h-1/16">Title of Page</div>

      <CustomCarousel />

      <div className="flex justify-center items-center h-1/16">Region "Intro" goes here</div>
      <div className="flex flex-row justify-center gap-2 h-1/16">
        <Button
          className="w-1/4"
          label="Route Guide"
          icon="pi pi-map"
        />
        <Button
          className="w-1/4"
          label="Regional Info"
          icon="pi pi-info-circle"
        />
        <Button
          className="w-1/4"
          label="Regonal Pokemon"
          icon="pi pi-globe"
        />
      </div>
      <div> SHOW POKEMON HERE</div>
    </div>
  );
}
