import {cleanStringAndAbbreviate} from "../../../../../utils/string-helpers.ts";

export default function AreaSelector({ areas, selectedArea, onSelectArea }) {
    const hasMultipleAreas = areas.length > 1;

    if (!hasMultipleAreas) return null;

    return (
        <div className="text-center">
            <div className="text-sm mb-2">Select Area:</div>

            {areas.map((area: any) => (
                <div
                    onClick={() => onSelectArea(area.url)}
                    key={area.name}
                    className={`cursor-pointer p-2 hover:bg-gray-700 ${
                        selectedArea?.name === area.name ? "bg-gray-600" : ""
                    }`}
                >
                    {cleanStringAndAbbreviate(area.name)}
                </div>
            ))}
        </div>
    );
}
