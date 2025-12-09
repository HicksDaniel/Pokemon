import { typeColors } from "./pokemonTypeColors";

const createSimplePokemonCard = (pokemon: any) => {
  const type1 = pokemon.types?.type1 || "";
  const type2 = pokemon.types?.type2 || "";

  return (
    <div key={pokemon?.id} className="pokemon-card" style={{ "--bg-color": typeColors[type1] }}>
      <div className="pokemon-card-header">
        <div className="pokemon-name">{pokemon?.name}</div>
        <div className="pokemon-types-container">
          {type1 ? (
            <div className="type-badge" style={{ "--bg-color": typeColors[type1] }}>
              <div className="type-indicator" style={{ "--bg-color": typeColors[type1] }} />
              <div className="type-label">{type1}</div>
            </div>
          ) : null}

          {type2 ? (
            <div className="type-badge" style={{ "--bg-color": typeColors[type2] }}>
              <div className="type-indicator" style={{ "--bg-color": typeColors[type2] }} />
              <div className="type-label">{type2}</div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="pokemon-image-container">
        <img src={pokemon?.images?.default} />
      </div>
    </div>
  );
};

export default createSimplePokemonCard;
