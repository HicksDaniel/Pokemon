

import type {Encounter} from "../../../regionpage.ts";

export function EncounterTable({ encounters, selectedVersion } : { encounters: Encounter[], selectedVersion: any } ) {
    if (!encounters?.length) return null;
    return (
        <table className="w-full">
            <thead>
            <tr>
                <th className="text-left p-2">Pokemon</th>
                <th className="text-left p-2">Catch Chance</th>
            </tr>
            </thead>

            {/*<tbody>*/}
            {/*{encounters.map(encounter => (*/}
            {/*    <EncounterRow*/}
            {/*        key={encounter.pokemon.name}*/}
            {/*        encounter={encounter}*/}
            {/*        selectedVersion={selectedVersion}*/}
            {/*    />*/}
            {/*))}*/}
            {/*</tbody>*/}
        </table>
    );
}
