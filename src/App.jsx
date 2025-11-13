import { useState, useEffect } from "react";
import './App.css';

// Configuration and utilities
import { TYPE_COLORS, TRANSLATIONS, APP_SETTINGS } from './config';
import {
  getStatPercentage,
  getEvolutionChain,
  formatStatName,
  formatAbilityName,
  formatMoveName,
  getStatColor,
  loadFavorites,
  saveFavorites,
  isFavorite,
  toggleFavoriteStatus,
  isInCompareList,
  toggleCompareStatus,
} from './utils';

// Custom hooks
import { usePokemonData } from './hooks/usePokemonData';
import { useAudio } from './hooks/useAudio';

// Components
import PokedexHeader from './components/PokedexHeader';
import ControlPanel from './components/ControlPanel';
import SearchBar from './components/SearchBar';
import PokemonInfo from './components/PokemonInfo';
import PokemonStats from './components/PokemonStats';
import PokemonMore from './components/PokemonMore';
import WelcomeScreen from './components/WelcomeScreen';
import LoadingScreen from './components/LoadingScreen';
import ErrorMessage from './components/ErrorMessage';

function App() {
  // State management
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("info");
  const [language, setLanguage] = useState(APP_SETTINGS.DEFAULT_LANGUAGE);
  const [soundEnabled, setSoundEnabled] = useState(APP_SETTINGS.DEFAULT_SOUND_ENABLED);
  const [favorites, setFavorites] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [showShiny, setShowShiny] = useState(false);

  // Custom hooks
  const { pokemon, evolution, moves, loading, error, fetchPokemon } = usePokemonData();
  const { playClickSound, playCry, playCryWithDelay } = useAudio(soundEnabled);

  // Get translations
  const t = TRANSLATIONS[language];

  // Load favorites on mount
  useEffect(() => {
    const loadedFavorites = loadFavorites(APP_SETTINGS.STORAGE_KEY_FAVORITES);
    setFavorites(loadedFavorites);
  }, []);

  // Handlers
  const handleSearch = async () => {
    if (!search.trim()) {
      return;
    }

    playClickSound();
    setActiveTab("info");

    const result = await fetchPokemon(search);

    // Play cry if Pokemon was found
    if (result && result.cries && result.cries.latest) {
      playCryWithDelay(result.cries.latest);
    }

    setSearch("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleToggleFavorite = () => {
    if (!pokemon) return;

    const newFavorites = toggleFavoriteStatus(favorites, pokemon);
    setFavorites(newFavorites);
    saveFavorites(APP_SETTINGS.STORAGE_KEY_FAVORITES, newFavorites);
    playClickSound();
  };

  const handleToggleCompare = () => {
    if (!pokemon) return;

    const newCompareList = toggleCompareStatus(
      compareList,
      pokemon,
      APP_SETTINGS.MAX_COMPARE_POKEMON
    );
    setCompareList(newCompareList);
    playClickSound();
  };

  const handleRemoveFromCompare = (pokemonToRemove) => {
    setCompareList(compareList.filter(p => p.id !== pokemonToRemove.id));
    playClickSound();
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    playClickSound();
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    playClickSound();
  };

  const handleShinyToggle = () => {
    setShowShiny(!showShiny);
    playClickSound();
  };

  const handleSoundToggle = () => {
    setSoundEnabled(!soundEnabled);
    playClickSound();
  };

  const handlePlayCry = () => {
    if (pokemon && pokemon.cries && pokemon.cries.latest) {
      playCry(pokemon.cries.latest);
    }
  };

  const handleEvolutionClick = (evolutionName) => {
    setSearch(evolutionName);
  };

  return (
    <div className="app">
      <div className="pokedex-container">
        {/* Pokédex Header with lights */}
        <PokedexHeader />

        {/* Main Screen */}
        <div className="pokedex-main">
          <div className="screen-frame">
            <div className="screen-content">
              {/* Control Panel (Language & Sound) */}
              <ControlPanel
                language={language}
                soundEnabled={soundEnabled}
                onLanguageChange={handleLanguageChange}
                onSoundToggle={handleSoundToggle}
              />

              {/* Search Bar */}
              <SearchBar
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onSearch={handleSearch}
                onKeyPress={handleKeyPress}
                placeholder={t.search}
                disabled={loading}
              />

              {/* Error Message */}
              {error && <ErrorMessage message={error} />}

              {/* Loading State */}
              {loading && <LoadingScreen message={t.loading} />}

              {/* Pokemon Display */}
              {pokemon && !loading && (
                <div className="pokemon-display">
                  {/* Pokemon Header */}
                  <div className="pokemon-header">
                    <h2 className="pokemon-name">{pokemon.name}</h2>
                    <span className="pokemon-id">
                      #{pokemon.id.toString().padStart(3, "0")}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <ActionButtons
                    isFavorite={isFavorite(favorites, pokemon.id)}
                    isInCompare={isInCompareList(compareList, pokemon.id)}
                    isCompareDisabled={
                      compareList.length >= APP_SETTINGS.MAX_COMPARE_POKEMON &&
                      !isInCompareList(compareList, pokemon.id)
                    }
                    showShiny={showShiny}
                    hasCry={!!(pokemon.cries && pokemon.cries.latest)}
                    onToggleFavorite={handleToggleFavorite}
                    onToggleCompare={handleToggleCompare}
                    onToggleShiny={handleShinyToggle}
                    onPlayCry={handlePlayCry}
                    translations={t}
                  />

                  {/* Tab Navigation */}
                  <TabNavigation
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                    translations={t}
                  />

                  {/* Tab Content */}
                  {activeTab === "info" && (
                    <PokemonInfo
                      pokemon={pokemon}
                      showShiny={showShiny}
                      typeColors={TYPE_COLORS}
                      translations={t}
                    />
                  )}

                  {activeTab === "stats" && (
                    <PokemonStats
                      stats={pokemon.stats}
                      translations={t}
                    />
                  )}

                  {activeTab === "more" && (
                    <PokemonMore
                      evolution={evolution}
                      moves={moves}
                      compareList={compareList}
                      onEvolutionClick={handleEvolutionClick}
                      onRemoveFromCompare={handleRemoveFromCompare}
                      translations={t}
                    />
                  )}
                </div>
              )}

              {/* Welcome State & Favorites */}
              {!pokemon && !loading && !error && (
                <WelcomeScreen
                  favorites={favorites}
                  onFavoriteClick={setSearch}
                  translations={t}
                />
              )}
            </div>

            {/* Screen dots decoration */}
            <div className="screen-dots">
              <span></span>
              <span></span>
            </div>
          </div>

          {/* Control Buttons (D-pad and action buttons) */}
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

        {/* Bottom Section with speaker */}
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

// Sub-components

const ActionButtons = ({
  isFavorite,
  isInCompare,
  isCompareDisabled,
  showShiny,
  hasCry,
  onToggleFavorite,
  onToggleCompare,
  onToggleShiny,
  onPlayCry,
  translations,
}) => (
  <div style={{
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
    marginBottom: '10px',
    flexWrap: 'wrap'
  }}>
    <button
      onClick={onToggleFavorite}
      style={{
        padding: '8px 15px',
        borderRadius: '10px',
        border: '2px solid #2c3e50',
        background: isFavorite ? '#e74c3c' : 'rgba(255,255,255,0.8)',
        color: isFavorite ? 'white' : '#2c3e50',
        fontSize: '14px',
        cursor: 'pointer',
        fontWeight: '600'
      }}
    >
      ❤️
    </button>
    <button
      onClick={onToggleCompare}
      disabled={isCompareDisabled}
      style={{
        padding: '8px 15px',
        borderRadius: '10px',
        border: '2px solid #2c3e50',
        background: isInCompare ? '#4CAF50' : 'rgba(255,255,255,0.8)',
        color: isInCompare ? 'white' : '#2c3e50',
        fontSize: '14px',
        cursor: isCompareDisabled ? 'not-allowed' : 'pointer',
        fontWeight: '600',
        opacity: isCompareDisabled ? 0.5 : 1
      }}
    >
      ⚖️
    </button>
    <button
      onClick={onToggleShiny}
      style={{
        padding: '8px 15px',
        borderRadius: '10px',
        border: '2px solid #2c3e50',
        background: showShiny ? '#f39c12' : 'rgba(255,255,255,0.8)',
        color: showShiny ? 'white' : '#2c3e50',
        fontSize: '14px',
        cursor: 'pointer',
        fontWeight: '600'
      }}
    >
      ✨
    </button>
    {hasCry && (
      <button
        onClick={onPlayCry}
        style={{
          padding: '8px 15px',
          borderRadius: '10px',
          border: '2px solid #2c3e50',
          background: '#9b59b6',
          color: 'white',
          fontSize: '14px',
          cursor: 'pointer',
          fontWeight: '600'
        }}
        title={translations.playCry}
      >
        🔊
      </button>
    )}
  </div>
);

const TabNavigation = ({ activeTab, onTabChange, translations }) => (
  <div style={{
    display: 'flex',
    gap: '5px',
    marginBottom: '15px',
    justifyContent: 'center'
  }}>
    {['info', 'stats', 'more'].map((tab) => (
      <button
        key={tab}
        onClick={() => onTabChange(tab)}
        style={{
          padding: '8px 15px',
          borderRadius: '8px',
          border: '2px solid #2c3e50',
          background: activeTab === tab ? '#3498db' : 'rgba(255,255,255,0.8)',
          color: activeTab === tab ? 'white' : '#2c3e50',
          fontSize: '12px',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        {translations[tab]}
      </button>
    ))}
  </div>
);

export default App;