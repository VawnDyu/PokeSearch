import React, { useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();
    if (search.trim() === "") {
      setError("Please enter a valid Pokemon name or ID.");
      setPokemon(null);
      return;
    }
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
      setPokemon(response.data);
      setError("");
    } catch (error) {
      setError("Pokemon not found.");
      setPokemon(null);
    }
    setSearch("");
  };

  const handleChange = (event) => {
    setError("");
    setSearch(event.target.value);
  };

  return (
    <div className="container">
      <h1>Pokemon Search</h1>
      <form onSubmit={handleSearch} className="search-container">
        <input type="text" placeholder="Search Pokemon..." value={search} onChange={handleChange} />
      </form>
      {error && <p className="error">{error}</p>}
      {pokemon && (
        <div className="details">
          <h2 className="name">{pokemon.name}</h2>
          <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.id.toString().padStart(3, '0')}.png`} alt={pokemon.name} className="image" />
          <ul>
            <li>Height: {pokemon.height / 10} m</li>
            <li>Weight: {pokemon.weight / 10} kg</li>
            <li>Base Experience: {pokemon.base_experience}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
