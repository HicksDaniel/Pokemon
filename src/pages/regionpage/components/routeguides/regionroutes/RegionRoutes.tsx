import { useDataStore } from "../../../../../store";
import RouteDetails from "./RouteDetails.tsx";
import DisplayArea from "./DisplayArea.tsx";

export default function RegionRoutes() {
  const { selectedCategory, setSelectedLocation, filteredCategory } = useDataStore();

  if (!filteredCategory?.data) return null;

  return (
    <div className="flex w-full h-[830px] flex-row overflow-hidden gap-1 scroll-bar-hidden">
      <div className="flex w-3/16 flex-col gap-4 overflow-auto">
        <div className="text-center"> {selectedCategory.title}</div>
        <div className="text-center"> {filteredCategory.data.length} Locations</div>
        <div className=" h-full overflow-auto">
          {filteredCategory.data.map((loc: any) => {
            return (
              <div
                className="pl-3 cursor-pointer hover:bg-gray-700"
                onClick={() => setSelectedLocation(loc.name, loc.locData)}
                key={loc.name}
              >
                {loc.name}
              </div>
            );
          })}
        </div>
      </div>
      <RouteDetails />
      <DisplayArea />
    </div>
  );
}
