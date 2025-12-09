import useStore from "../../../../../store.ts";
import RouteDetails from "./RouteDetails.tsx";

export default function RegionRoutes() {
  const {
    selectedRegion,
    allRegionalData,
    selectedCategory,
    setSelectedLocation,
  } = useStore();

  if (!allRegionalData || !selectedRegion || !selectedCategory) return null;

  const region = allRegionalData.find(r => r.region === selectedRegion);

  const category = region.locations.find(c => c.title === selectedCategory);
  if (!category?.data) return null;

  return (
    <div className="flex w-full h-[830px] flex-row overflow-hidden gap-1 scroll-bar-hidden">
      <div className="flex w-3/16 flex-col gap-4 overflow-auto">
        <div className="text-center"> {selectedCategory}</div>
        <div className="text-center"> {category.data.length} Locations</div>
        <div className=" h-full overflow-auto">
          {category.data.map((loc) => (
            <div
              className="pl-3"
              onClick={() => setSelectedLocation(loc)}
              key={loc.name}
            >
              {loc.name}
            </div>
          ))}
        </div>
      </div>
        <RouteDetails />
    </div>
  );
}
