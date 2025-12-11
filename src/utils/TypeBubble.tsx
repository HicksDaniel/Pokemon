import {typeColors} from "./pokemonTypeColors.ts";

export default function TypeBubble({ type }: { type: string }) {
    return (
        <div className="type-badge" style={{ "--bg-color": typeColors[type] }}>
            <div className="type-indicator" style={{ "--bg-color": typeColors[type] }} />
            <div className="type-label">{type}</div>
        </div>
    );
}