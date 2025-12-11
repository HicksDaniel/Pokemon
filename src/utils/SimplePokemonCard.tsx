import { typeColors } from "./pokemonTypeColors";
import type {SimplePokemon} from "../stores/dataStore.ts";
import TypeBubble from "./TypeBubble.tsx";

export default function SimplePokemonCard({pokemon} : {pokemon : SimplePokemon}) {
  const type1 = pokemon.types?.type1 || "";
  const type2 = pokemon.types?.type2 || "";

  console.log(pokemon)

  return (
    <div key={pokemon?.id} className="pokemon-card" style={{ "--bg-color": typeColors[type1] }}>
      <div className="pokemon-card-header">
        <div className="pokemon-name">{pokemon?.name}</div>
        <div className="pokemon-types-container">
            {type1 && <TypeBubble type={type1}/>}
            {type2 && <TypeBubble type={type2}/>}
        </div>
      </div>
      <div className="pokemon-image-container">
        <img alt="NOTHING" src={pokemon?.image?.default} />
      </div>
    </div>
  );
};

