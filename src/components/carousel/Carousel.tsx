import { useState } from "react";
import { Button } from "primereact/button";

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

export default function CustomCarousel() {
  const [viewport, setViewport] = useState(REGIONAL_ARTWORK[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const pageSize = 4;
  const total = REGIONAL_ARTWORK.length;

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + total) % total;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1 + total) % total;
    setCurrentIndex(newIndex);
  };
  const visibleItems = Array.from({ length: pageSize }).map(
    (_, i) => REGIONAL_ARTWORK[(currentIndex + i) % total]
  );

  return (
    <>
      <div className="flex flex-col justify-evenly items-center">
        <div className="flex items-center justify-center h-11/16 ">
          <img className="flex h-full justify-center align-center w-full" src={viewport.img} />
        </div>

        <div className="flex flex-row justify-center items-center gap-2">
          <Button label="Prev" onClick={handlePrev} />

          {visibleItems.map((region) => (
            <div
              key={region.id}
              onClick={() => setViewport(region)}
              className={`flex flex-col text-center opacity-50 justify-center overflow-hidden h-full ${
                viewport.id === region.id ? "inset-border-2 border-blue opacity-100" : ""
              }`}
            >
              <div className="image-wrapper">
                <img src={region.img} />
              </div>
              <p>{region.name}</p>
            </div>
          ))}
          <Button label="Next" onClick={handleNext} />
        </div>
      </div>
    </>
  );
}
