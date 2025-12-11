export function GameVersionLabel({ version }) {
    if (!version) return null;

    return (
        <div className="text-sm text-center mb-2">
            Game Version: <span className="font-semibold">{version}</span>
        </div>
    );
}