import { STAT_THRESHOLDS, STAT_COLORS } from './config';

export const getStatPercentage = (stat) => {
  return Math.min((stat / STAT_THRESHOLDS.MAX) * 100, 100);
};

export const getEvolutionChain = (chain) => {
  const evoChain = [];
  let current = chain;

  while (current) {
    evoChain.push({
      name: current.species.name,
      id: current.species.url.split('/').slice(-2, -1)[0]
    });
    current = current.evolves_to[0];
  }

  return evoChain;
};

export const formatStatName = (statName) => {
  return statName
    .replace("special-", "Sp. ")
    .replace("-", " ");
};

export const formatAbilityName = (abilityName) => {
  return abilityName.replace(/-/g, " ");
};

export const formatMoveName = (moveName) => {
  return moveName.replace(/-/g, " ");
};

export const getStatColor = (statValue) => {
  if (statValue > STAT_THRESHOLDS.HIGH) return STAT_COLORS.HIGH;
  if (statValue > STAT_THRESHOLDS.MEDIUM) return STAT_COLORS.MEDIUM;
  return STAT_COLORS.LOW;
};

export const loadFavorites = (storageKey) => {
  try {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading favorites:", error);
    return [];
  }
};

export const saveFavorites = (storageKey, favorites) => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(favorites));
  } catch (error) {
    console.error("Error saving favorites:", error);
  }
};

export const isFavorite = (favorites, pokemonId) => {
  return favorites.some(f => f.id === pokemonId);
};

export const toggleFavoriteStatus = (favorites, pokemon) => {
  const isFav = isFavorite(favorites, pokemon.id);

  if (isFav) {
    // Remove from favorites
    return favorites.filter(f => f.id !== pokemon.id);
  } else {
    // Add to favorites
    return [
      ...favorites,
      {
        id: pokemon.id,
        name: pokemon.name,
        sprite: pokemon.sprites.front_default
      }
    ];
  }
};

export const isInCompareList = (compareList, pokemonId) => {
  return compareList.some(p => p.id === pokemonId);
};

export const toggleCompareStatus = (compareList, pokemon, maxCompare) => {
  const isInList = isInCompareList(compareList, pokemon.id);

  if (isInList) {
    // Remove from compare list
    return compareList.filter(p => p.id !== pokemon.id);
  } else if (compareList.length < maxCompare) {
    // Add to compare list if under limit
    return [...compareList, pokemon];
  }

  // Return unchanged if at max capacity
  return compareList;
};

export const formatHeight = (height) => {
  return `${(height / 10).toFixed(1)}m`;
};

export const formatWeight = (weight) => {
  return `${(weight / 10).toFixed(1)}kg`;
};

export const formatPokemonId = (id, length = 3) => {
  return id.toString().padStart(length, "0");
};

export const capitalizeFirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getPokemonSprite = (pokemon, isShiny = false) => {
  if (!pokemon || !pokemon.sprites) return '';

  const artwork = pokemon.sprites.other?.["official-artwork"];

  if (isShiny && artwork?.front_shiny) {
    return artwork.front_shiny;
  }

  return artwork?.front_default || pokemon.sprites.front_default;
};

export const hasCry = (pokemon) => {
  return !!(pokemon?.cries?.latest);
};

export const getCryUrl = (pokemon) => {
  return pokemon?.cries?.latest || null;
};