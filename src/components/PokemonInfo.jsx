import React from 'react';
import { formatAbilityName } from '../utils';

const PokemonInfo = ({ pokemon, showShiny, typeColors, translations }) => (
  <>
    {/* Pokemon Image */}
    <div className="pokemon-image-container">
      <img
        src={
          showShiny
            ? pokemon.sprites.other["official-artwork"].front_shiny
            : pokemon.sprites.other["official-artwork"].front_default
        }
        alt={pokemon.name}
        className="pokemon-image"
      />
    </div>

    {/* Types */}
    <div className="pokemon-types">
      {pokemon.types.map((type) => (
        <span
          key={type.type.name}
          className="type-badge"
          style={{ backgroundColor: typeColors[type.type.name] }}
        >
          {type.type.name}
        </span>
      ))}
    </div>

    {/* Info Grid */}
    <div className="info-section">
      <div className="info-row">
        <div className="info-item">
          <span className="info-label">{translations.height}</span>
          <span className="info-value">
            {(pokemon.height / 10).toFixed(1)}m
          </span>
        </div>
        <div className="info-item">
          <span className="info-label">{translations.weight}</span>
          <span className="info-value">
            {(pokemon.weight / 10).toFixed(1)}kg
          </span>
        </div>
      </div>
    </div>

    {/* Abilities */}
    <div className="abilities-section">
      <h3 className="section-title">{translations.abilities}</h3>
      <div className="abilities-list">
        {pokemon.abilities.map((ability) => (
          <span
            key={ability.ability.name}
            className={`ability-tag ${ability.is_hidden ? "hidden-ability" : ""}`}
          >
            {formatAbilityName(ability.ability.name)}
          </span>
        ))}
      </div>
    </div>
  </>
);

export default PokemonInfo;