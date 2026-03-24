import { typeColors } from "./pokemonTypeColors";
import type {SimplePokemon} from "../stores/dataStore.ts";
import TypeBubble from "./TypeBubble.tsx";

export default function SimplePokemonCard({pokemon} : {pokemon : SimplePokemon}) {


    if (!pokemon) return null;

   const handleClick = () => {
       console.log(pokemon.cries.legacy);
        const audio = new Audio(pokemon.cries.legacy);
        audio.volume = 0.1;
         audio.play();


   }

           const type1: string = pokemon.types?.type1 || "";
           const type2: string = pokemon.types?.type2 || "";

           return (
           <div key={pokemon?.id} className="pokemon-card"
                style={{"--bg-color": typeColors[type1]} as React.CSSProperties}>
               <div className="pokemon-card-header">
                   <div className="pokemon-name">{pokemon?.name}</div>
                   <div className="pokemon-types-container">
                       {type1 && <TypeBubble type={type1}/>}
                       {type2 && <TypeBubble type={type2}/>}
                   </div>
               </div>
               <div className="pokemon-image-container">
                   <img onClick={handleClick} alt="NOTHING" src={pokemon?.images?.default}/>
               </div>
           </div>
           );
           };

