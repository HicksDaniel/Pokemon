import { useState } from "react";
import { Button } from "primereact/button";
import useStore from "../../store";

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
  const { setSelectedRegion } = useStore();
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
      <div className="flex h-[500px] flex-col justify-evenly items-center">
        <div className="flex items-center justify-center h-11/16 ">
          <img className="rounded-2xl image-wrapper" src={viewport.img} />
        </div>
        <div className="flex h-5/16 w-[800px] justify-between items-center gap-2">
          <Button className="h-3/8" label="Prev" onClick={handlePrev} />
          <div className="grid w-3/4 h-full grid-cols-4  justify-center items-center gap-2">
            {visibleItems.map((region) => (
              <div
                key={region.id}
                onClick={() => {
                  setViewport(region), setSelectedRegion(region.id);
                }}
                className={`flex flex-col text-center opacity-50 justify-center overflow-hidden h-full ${
                  viewport.id === region.id ? "inset-border-2 border-blue opacity-100" : ""
                }`}
              >
                <img className="w-auto h-12/16 contain-size rounded-2xl" src={region.img} />

                <div className="mt-1 text-sm">{region.name}</div>
              </div>
            ))}
          </div>
          <Button className="h-3/8" label="Next" onClick={handleNext} />
        </div>
      </div>
    </>
  );
}
