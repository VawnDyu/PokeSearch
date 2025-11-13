import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    if (search.trim() === "") {
      setError("Please enter a Pokémon name or ID");
      setPokemon(null);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
      );
      setPokemon(response.data);
      setError("");
    } catch (error) {
      setError("Pokémon not found. Try another name or ID!");
      setPokemon(null);
    } finally {
      setLoading(false);
      setSearch("");
    }
  };

  const handleChange = (event) => {
    setError("");
    setSearch(event.target.value);
  };

  const getStatPercentage = (stat) => {
    return Math.min((stat / 255) * 100, 100);
  };

  return (
    <div className="app">
      <div className="pokedex-container">
        {/* Top Section - Pokédex Header */}
        <div className="pokedex-top">
          <div className="pokedex-lights">
            <div className="big-light">
              <div className="big-light-inner"></div>
            </div>
            <div className="small-lights">
              <div className="small-light red"></div>
              <div className="small-light yellow"></div>
              <div className="small-light green"></div>
            </div>
          </div>
          <div className="pokedex-curve"></div>
        </div>

        {/* Main Screen */}
        <div className="pokedex-main">
          <div className="screen-frame">
            <div className="screen-content">
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  placeholder="Search Pokémon..."
                  value={search}
                  onChange={handleChange}
                  className="search-input"
                  disabled={loading}
                />
                <button type="submit" className="search-button" disabled={loading}>
                  {loading ? "..." : "→"}
                </button>
              </form>

              {/* Error Message */}
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              {/* Loading State */}
              {loading && (
                <div className="loading">
                  <div className="pokeball-loader"></div>
                  <p>Loading...</p>
                </div>
              )}

              {/* Pokemon Display */}
              {pokemon && !loading && (
                <div className="pokemon-display">
                  {/* Pokemon Header */}
                  <div className="pokemon-header">
                    <h2 className="pokemon-name">{pokemon.name}</h2>
                    <span className="pokemon-id">#{pokemon.id.toString().padStart(3, "0")}</span>
                  </div>

                  {/* Pokemon Image */}
                  <div className="pokemon-image-container">
                    <img
                      src={pokemon.sprites.other["official-artwork"].front_default}
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
                        <span className="info-label">Height</span>
                        <span className="info-value">{(pokemon.height / 10).toFixed(1)}m</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Weight</span>
                        <span className="info-value">{(pokemon.weight / 10).toFixed(1)}kg</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="stats-section">
                    <h3 className="section-title">Base Stats</h3>
                    <div className="stats-list">
                      {pokemon.stats.map((stat) => (
                        <div key={stat.stat.name} className="stat-row">
                          <span className="stat-name">
                            {stat.stat.name.replace("special-", "Sp. ").replace("-", " ")}
                          </span>
                          <div className="stat-bar-bg">
                            <div
                              className="stat-bar"
                              style={{
                                width: `${getStatPercentage(stat.base_stat)}%`,
                                backgroundColor: stat.base_stat > 100 ? '#4CAF50' : stat.base_stat > 60 ? '#FFC107' : '#FF5722'
                              }}
                            ></div>
                          </div>
                          <span className="stat-value">{stat.base_stat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Abilities */}
                  <div className="abilities-section">
                    <h3 className="section-title">Abilities</h3>
                    <div className="abilities-list">
                      {pokemon.abilities.map((ability) => (
                        <span
                          key={ability.ability.name}
                          className={`ability-tag ${ability.is_hidden ? "hidden-ability" : ""}`}
                        >
                          {ability.ability.name.replace("-", " ")}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Welcome State */}
              {!pokemon && !loading && !error && (
                <div className="welcome-state">
                  <div className="pokeball-icon">⚪</div>
                  <h3>Welcome to Pokédex!</h3>
                  <p>Search for any Pokémon by name or number</p>
                </div>
              )}
            </div>

            {/* Screen dots decoration */}
            <div className="screen-dots">
              <span></span>
              <span></span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="pokedex-controls">
            <div className="dpad">
              <div className="dpad-vertical"></div>
              <div className="dpad-horizontal"></div>
              <div className="dpad-center"></div>
            </div>
            <div className="action-buttons">
              <div className="action-button"></div>
              <div className="action-button"></div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pokedex-bottom">
          <div className="bottom-lights">
            <div className="speaker">
              <div className="speaker-line"></div>
              <div className="speaker-line"></div>
              <div className="speaker-line"></div>
              <div className="speaker-line"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;