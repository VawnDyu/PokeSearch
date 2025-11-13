import { useState } from 'react';
import { API_CONFIG, APP_SETTINGS } from '../config';

export const usePokemonData = () => {
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evolution, setEvolution] = useState(null);
  const [moves, setMoves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPokemon = async (searchTerm) => {
    // Validate input
    if (!searchTerm || !searchTerm.trim()) {
      setError("Please enter a Pokémon name or ID");
      setPokemon(null);
      return null;
    }

    setLoading(true);
    setError("");

    try {
      // Fetch main Pokemon data
      const pokemonUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POKEMON}/${searchTerm.toLowerCase()}`;
      const pokemonResponse = await fetch(pokemonUrl);

      if (!pokemonResponse.ok) {
        throw new Error("Pokemon not found");
      }

      const pokemonData = await pokemonResponse.json();

      // Fetch species data
      const speciesResponse = await fetch(pokemonData.species.url);
      const speciesData = await speciesResponse.json();

      // Fetch evolution chain if available
      let evolutionData = null;
      if (speciesData.evolution_chain && speciesData.evolution_chain.url) {
        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        evolutionData = await evolutionResponse.json();
      }

      // Set all data
      setPokemon(pokemonData);
      setSpecies(speciesData);
      setEvolution(evolutionData);
      setMoves(pokemonData.moves.slice(0, APP_SETTINGS.MAX_MOVES_DISPLAY));
      setError("");

      return pokemonData;
    } catch (err) {
      console.error("Error fetching Pokemon:", err);
      setError("Pokémon not found. Try another name or ID!");
      setPokemon(null);
      setSpecies(null);
      setEvolution(null);
      setMoves([]);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Clear all Pokemon data and reset state
   */
  const clearPokemon = () => {
    setPokemon(null);
    setSpecies(null);
    setEvolution(null);
    setMoves([]);
    setError("");
  };

  return {
    pokemon,
    species,
    evolution,
    moves,
    loading,
    error,
    fetchPokemon,
    clearPokemon,
  };
};