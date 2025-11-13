// Type Colors for Pokemon Types
export const TYPE_COLORS = {
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

// Translation Object for Multi-language Support
export const TRANSLATIONS = {
  en: {
    search: "Search Pokémon...",
    welcome: "Welcome to Pokédex!",
    searchPrompt: "Search for any Pokémon by name or number",
    height: "Height",
    weight: "Weight",
    baseExp: "Base Exp",
    baseStats: "Base Stats",
    abilities: "Abilities",
    evolution: "Evolution Chain",
    moves: "Moves",
    info: "Info",
    stats: "Stats",
    more: "More",
    shiny: "Shiny",
    normal: "Normal",
    favorites: "Favorites",
    playCry: "Play Cry",
    loading: "Loading...",
    notFound: "Pokémon not found. Try another name or ID!",
    enterName: "Please enter a Pokémon name or ID",
    compare: "Compare",
  },
  es: {
    search: "Buscar Pokémon...",
    welcome: "¡Bienvenido a Pokédex!",
    searchPrompt: "Busca cualquier Pokémon por nombre o número",
    height: "Altura",
    weight: "Peso",
    baseExp: "Exp. Base",
    baseStats: "Estadísticas",
    abilities: "Habilidades",
    evolution: "Evolución",
    moves: "Movimientos",
    info: "Info",
    stats: "Stats",
    more: "Más",
    shiny: "Shiny",
    normal: "Normal",
    favorites: "Favoritos",
    playCry: "Oír Grito",
    loading: "Cargando...",
    notFound: "Pokémon no encontrado. ¡Prueba otro nombre o ID!",
    enterName: "Por favor ingresa un nombre o ID de Pokémon",
    compare: "Comparar",
  },
  ja: {
    search: "ポケモンを検索...",
    welcome: "ポケモン図鑑へようこそ！",
    searchPrompt: "名前または番号でポケモンを検索",
    height: "高さ",
    weight: "重さ",
    baseExp: "経験値",
    baseStats: "種族値",
    abilities: "特性",
    evolution: "進化",
    moves: "技",
    info: "情報",
    stats: "能力",
    more: "詳細",
    shiny: "色違い",
    normal: "通常",
    favorites: "お気に入り",
    playCry: "鳴き声",
    loading: "読み込み中...",
    notFound: "ポケモンが見つかりません。別の名前またはIDを試してください！",
    enterName: "ポケモンの名前または番号を入力してください",
    compare: "比較",
  },
};

// API Configuration
export const API_CONFIG = {
  BASE_URL: "https://pokeapi.co/api/v2",
  ENDPOINTS: {
    POKEMON: "/pokemon",
  },
};

// Application Settings
export const APP_SETTINGS = {
  MAX_MOVES_DISPLAY: 20,
  MAX_COMPARE_POKEMON: 3,
  DEFAULT_LANGUAGE: "en",
  DEFAULT_SOUND_ENABLED: true,
  STORAGE_KEY_FAVORITES: "pokesearch-favorites",
};

// Audio Configuration
export const AUDIO_CONFIG = {
  CLICK_SOUND: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2S57OihUhELTqXh8bllHw==",
  CLICK_VOLUME: 0.3,
  CRY_VOLUME: 0.1,
  CRY_DELAY: 300,
};

// Stat thresholds for color coding
export const STAT_THRESHOLDS = {
  HIGH: 100,
  MEDIUM: 60,
  MAX: 255,
};

// Stat colors
export const STAT_COLORS = {
  HIGH: "#4CAF50",
  MEDIUM: "#FFC107",
  LOW: "#FF5722",
};