import React, { useState, useEffect, useRef } from "react";
import './App.css'

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showShiny, setShowShiny] = useState(false);
  const [evolution, setEvolution] = useState(null);
  const [moves, setMoves] = useState([]);
  const [species, setSpecies] = useState(null);
  const [activeTab, setActiveTab] = useState("info");
  const [language, setLanguage] = useState("en");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [compareList, setCompareList] = useState([]);
  const audioRef = useRef(null);

  const typeColors = {
    normal: "#A8A878", fire: "#F08030", water: "#6890F0", electric: "#F8D030",
    grass: "#78C850", ice: "#98D8D8", fighting: "#C03028", poison: "#A040A0",
    ground: "#E0C068", flying: "#A890F0", psychic: "#F85888", bug: "#A8B820",
    rock: "#B8A038", ghost: "#705898", dragon: "#7038F8", dark: "#705848",
    steel: "#B8B8D0", fairy: "#EE99AC",
  };

  const translations = {
    en: {
      search: "Search Pokémon...",
      welcome: "Welcome to Pokédex!",
      searchPrompt: "Search for any Pokémon by name or number",
      height: "Height", weight: "Weight", baseExp: "Base Exp",
      baseStats: "Base Stats", abilities: "Abilities",
      evolution: "Evolution Chain", moves: "Moves",
      info: "Info", stats: "Stats", more: "More",
      shiny: "Shiny", normal: "Normal",
      favorites: "Favorites", playCry: "Play Cry",
    },
    es: {
      search: "Buscar Pokémon...",
      welcome: "¡Bienvenido a Pokédex!",
      searchPrompt: "Busca cualquier Pokémon por nombre o número",
      height: "Altura", weight: "Peso", baseExp: "Exp. Base",
      baseStats: "Estadísticas", abilities: "Habilidades",
      evolution: "Evolución", moves: "Movimientos",
      info: "Info", stats: "Stats", more: "Más",
      shiny: "Shiny", normal: "Normal",
      favorites: "Favoritos", playCry: "Oír Grito",
    },
    ja: {
      search: "ポケモンを検索...",
      welcome: "ポケモン図鑑へようこそ！",
      searchPrompt: "名前または番号でポケモンを検索",
      height: "高さ", weight: "重さ", baseExp: "経験値",
      baseStats: "種族値", abilities: "特性",
      evolution: "進化", moves: "技",
      info: "情報", stats: "能力", more: "詳細",
      shiny: "色違い", normal: "通常",
      favorites: "お気に入り", playCry: "鳴き声",
    },
  };

  const t = translations[language];

  useEffect(() => {
    const stored = localStorage.getItem("pokesearch-favorites");
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error("Error loading favorites:", e);
      }
    }
  }, []);

  const playSound = () => {
    if (soundEnabled) {
      const audio = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2S57OihUhELTqXh8bllHw==");
      audio.volume = 0.3;
      audio.play().catch(() => {});
    }
  };

  const playCry = (cryUrl) => {
    if (soundEnabled && cryUrl) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      audioRef.current = new Audio(cryUrl);
      audioRef.current.volume = 0.1;
      audioRef.current.play().catch(() => {});
    }
  };

  const handleSearch = async () => {
    if (search.trim() === "") {
      setError("Please enter a Pokémon name or ID");
      setPokemon(null);
      return;
    }

    setLoading(true);
    setError("");
    setActiveTab("info");
    playSound();

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
      );

      if (!response.ok) throw new Error("Not found");

      const data = await response.json();
      const speciesRes = await fetch(data.species.url);
      const speciesData = await speciesRes.json();

      setPokemon(data);
      setSpecies(speciesData);
      setError("");
      setShowShiny(false);

      // Play Pokemon cry when loaded
      if (data.cries && data.cries.latest) {
        setTimeout(() => playCry(data.cries.latest), 300);
      }

      if (speciesData.evolution_chain) {
        const evoRes = await fetch(speciesData.evolution_chain.url);
        const evoData = await evoRes.json();
        setEvolution(evoData);
      }

      setMoves(data.moves.slice(0, 20));

    } catch (error) {
      setError("Pokémon not found. Try another name or ID!");
      setPokemon(null);
      setSpecies(null);
      setEvolution(null);
      setMoves([]);
    } finally {
      setLoading(false);
      setSearch("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleFavorite = (poke) => {
    const newFavorites = favorites.some(f => f.id === poke.id)
      ? favorites.filter(f => f.id !== poke.id)
      : [...favorites, { id: poke.id, name: poke.name, sprite: poke.sprites.front_default }];

    setFavorites(newFavorites);
    localStorage.setItem("pokesearch-favorites", JSON.stringify(newFavorites));
    playSound();
  };

  const toggleCompare = (poke) => {
    if (compareList.some(p => p.id === poke.id)) {
      setCompareList(compareList.filter(p => p.id !== poke.id));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, poke]);
    }
    playSound();
  };

  const getEvolutionChain = (chain) => {
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

  const getStatPercentage = (stat) => Math.min((stat / 255) * 100, 100);

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
              {/* Language & Sound Controls */}
              <div style={{ display: 'flex', gap: '5px', marginBottom: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                  onClick={() => { setLanguage("en"); playSound(); }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '2px solid #2c3e50',
                    background: language === "en" ? '#3498db' : 'rgba(255,255,255,0.8)',
                    color: language === "en" ? 'white' : '#2c3e50',
                    fontSize: '11px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  EN
                </button>
                <button
                  onClick={() => { setLanguage("es"); playSound(); }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '2px solid #2c3e50',
                    background: language === "es" ? '#3498db' : 'rgba(255,255,255,0.8)',
                    color: language === "es" ? 'white' : '#2c3e50',
                    fontSize: '11px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  ES
                </button>
                <button
                  onClick={() => { setLanguage("ja"); playSound(); }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '2px solid #2c3e50',
                    background: language === "ja" ? '#3498db' : 'rgba(255,255,255,0.8)',
                    color: language === "ja" ? 'white' : '#2c3e50',
                    fontSize: '11px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  日本
                </button>
                <button
                  onClick={() => { setSoundEnabled(!soundEnabled); playSound(); }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '2px solid #2c3e50',
                    background: soundEnabled ? '#4CAF50' : 'rgba(255,255,255,0.8)',
                    color: soundEnabled ? 'white' : '#2c3e50',
                    fontSize: '11px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  🔊
                </button>
              </div>

              {/* Search Bar */}
              <div className="search-form">
                <input
                  type="text"
                  placeholder={t.search}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="search-input"
                  disabled={loading}
                />
                <button
                  onClick={handleSearch}
                  className="search-button"
                  disabled={loading}
                >
                  {loading ? "..." : "→"}
                </button>
              </div>

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

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '10px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => toggleFavorite(pokemon)}
                      style={{
                        padding: '8px 15px',
                        borderRadius: '10px',
                        border: '2px solid #2c3e50',
                        background: favorites.some(f => f.id === pokemon.id) ? '#e74c3c' : 'rgba(255,255,255,0.8)',
                        color: favorites.some(f => f.id === pokemon.id) ? 'white' : '#2c3e50',
                        fontSize: '14px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      ❤️
                    </button>
                    <button
                      onClick={() => toggleCompare(pokemon)}
                      style={{
                        padding: '8px 15px',
                        borderRadius: '10px',
                        border: '2px solid #2c3e50',
                        background: compareList.some(p => p.id === pokemon.id) ? '#4CAF50' : 'rgba(255,255,255,0.8)',
                        color: compareList.some(p => p.id === pokemon.id) ? 'white' : '#2c3e50',
                        fontSize: '14px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                      disabled={compareList.length >= 3 && !compareList.some(p => p.id === pokemon.id)}
                    >
                      ⚖️
                    </button>
                    <button
                      onClick={() => { setShowShiny(!showShiny); playSound(); }}
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
                    {pokemon.cries && pokemon.cries.latest && (
                      <button
                        onClick={() => playCry(pokemon.cries.latest)}
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
                        title={t.playCry}
                      >
                        🔊
                      </button>
                    )}
                  </div>

                  {/* Tab Navigation */}
                  <div style={{ display: 'flex', gap: '5px', marginBottom: '15px', justifyContent: 'center' }}>
                    <button
                      onClick={() => { setActiveTab("info"); playSound(); }}
                      style={{
                        padding: '8px 15px',
                        borderRadius: '8px',
                        border: '2px solid #2c3e50',
                        background: activeTab === "info" ? '#3498db' : 'rgba(255,255,255,0.8)',
                        color: activeTab === "info" ? 'white' : '#2c3e50',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      {t.info}
                    </button>
                    <button
                      onClick={() => { setActiveTab("stats"); playSound(); }}
                      style={{
                        padding: '8px 15px',
                        borderRadius: '8px',
                        border: '2px solid #2c3e50',
                        background: activeTab === "stats" ? '#3498db' : 'rgba(255,255,255,0.8)',
                        color: activeTab === "stats" ? 'white' : '#2c3e50',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      {t.stats}
                    </button>
                    <button
                      onClick={() => { setActiveTab("more"); playSound(); }}
                      style={{
                        padding: '8px 15px',
                        borderRadius: '8px',
                        border: '2px solid #2c3e50',
                        background: activeTab === "more" ? '#3498db' : 'rgba(255,255,255,0.8)',
                        color: activeTab === "more" ? 'white' : '#2c3e50',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      {t.more}
                    </button>
                  </div>

                  {/* Info Tab */}
                  {activeTab === "info" && (
                    <>
                      {/* Pokemon Image */}
                      <div className="pokemon-image-container">
                        <img
                          src={showShiny ? pokemon.sprites.other["official-artwork"].front_shiny : pokemon.sprites.other["official-artwork"].front_default}
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
                            <span className="info-label">{t.height}</span>
                            <span className="info-value">{(pokemon.height / 10).toFixed(1)}m</span>
                          </div>
                          <div className="info-item">
                            <span className="info-label">{t.weight}</span>
                            <span className="info-value">{(pokemon.weight / 10).toFixed(1)}kg</span>
                          </div>
                        </div>
                      </div>

                      {/* Abilities */}
                      <div className="abilities-section">
                        <h3 className="section-title">{t.abilities}</h3>
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
                    </>
                  )}

                  {/* Stats Tab */}
                  {activeTab === "stats" && (
                    <div className="stats-section">
                      <h3 className="section-title">{t.baseStats}</h3>
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
                  )}

                  {/* More Tab */}
                  {activeTab === "more" && (
                    <>
                      {/* Evolution Chain */}
                      {evolution && (
                        <div style={{ marginBottom: '15px' }}>
                          <h3 className="section-title">{t.evolution}</h3>
                          <div style={{
                            background: 'rgba(255,255,255,0.8)',
                            padding: '12px',
                            borderRadius: '10px',
                            border: '2px solid rgba(44,62,80,0.2)'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '5px' }}>
                              {getEvolutionChain(evolution.chain).map((evo, idx) => (
                                <React.Fragment key={evo.name}>
                                  <button
                                    onClick={() => setSearch(evo.name)}
                                    style={{
                                      flexShrink: 0,
                                      background: 'rgba(52,152,219,0.2)',
                                      border: '2px solid #3498db',
                                      borderRadius: '8px',
                                      padding: '8px 12px',
                                      cursor: 'pointer',
                                      color: '#2c3e50',
                                      fontWeight: '600',
                                      fontSize: '11px',
                                      textTransform: 'capitalize'
                                    }}
                                  >
                                    {evo.name}
                                  </button>
                                  {idx < getEvolutionChain(evolution.chain).length - 1 && (
                                    <span style={{ color: '#2c3e50', fontWeight: 'bold' }}>→</span>
                                  )}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Moves */}
                      {moves.length > 0 && (
                        <div>
                          <h3 className="section-title">{t.moves} (20)</h3>
                          <div style={{
                            background: 'rgba(255,255,255,0.8)',
                            padding: '10px',
                            borderRadius: '10px',
                            border: '2px solid rgba(44,62,80,0.2)',
                            maxHeight: '250px',
                            overflowY: 'auto'
                          }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                              {moves.map((move) => (
                                <div
                                  key={move.move.name}
                                  style={{
                                    background: 'rgba(52,152,219,0.2)',
                                    border: '1px solid #3498db',
                                    borderRadius: '6px',
                                    padding: '6px 8px',
                                    fontSize: '10px',
                                    color: '#2c3e50',
                                    fontWeight: '600',
                                    textTransform: 'capitalize'
                                  }}
                                >
                                  {move.move.name.replace("-", " ")}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Compare List */}
                      {compareList.length > 0 && (
                        <div style={{ marginTop: '15px' }}>
                          <h3 className="section-title">Compare ({compareList.length}/3)</h3>
                          <div style={{
                            background: 'rgba(255,255,255,0.8)',
                            padding: '10px',
                            borderRadius: '10px',
                            border: '2px solid rgba(44,62,80,0.2)'
                          }}>
                            {compareList.map((comp) => (
                              <div key={comp.id} style={{
                                background: 'rgba(76,175,80,0.2)',
                                border: '1px solid #4CAF50',
                                borderRadius: '8px',
                                padding: '8px',
                                marginBottom: '8px'
                              }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                                  <span style={{ color: '#2c3e50', fontWeight: '700', fontSize: '12px', textTransform: 'capitalize' }}>
                                    {comp.name}
                                  </span>
                                  <button
                                    onClick={() => toggleCompare(comp)}
                                    style={{
                                      background: '#e74c3c',
                                      color: 'white',
                                      border: 'none',
                                      borderRadius: '4px',
                                      padding: '2px 8px',
                                      cursor: 'pointer',
                                      fontSize: '10px',
                                      fontWeight: '600'
                                    }}
                                  >
                                    ✕
                                  </button>
                                </div>
                                {comp.stats.slice(0, 3).map((stat) => (
                                  <div key={stat.stat.name} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: '10px',
                                    color: '#2c3e50',
                                    marginBottom: '2px'
                                  }}>
                                    <span style={{ textTransform: 'capitalize' }}>{stat.stat.name.split('-')[0]}</span>
                                    <span style={{ fontWeight: '700' }}>{stat.base_stat}</span>
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Welcome State & Favorites */}
              {!pokemon && !loading && !error && (
                <>
                  <div className="welcome-state">
                    <div className="pokeball-icon">
                      <img src="./pokeball.png" alt="Pokeball" className="pokeball-img" />
                    </div>
                    <h3>{t.welcome}</h3>
                    <p>{t.searchPrompt}</p>
                  </div>

                  {/* Favorites */}
                  {favorites.length > 0 && (
                    <div style={{ marginTop: '20px' }}>
                      <h3 className="section-title">❤️ {t.favorites}</h3>
                      <div style={{
                        background: 'rgba(255,255,255,0.8)',
                        padding: '10px',
                        borderRadius: '10px',
                        border: '2px solid rgba(44,62,80,0.2)',
                        maxHeight: '200px',
                        overflowY: 'auto'
                      }}>
                        {favorites.map((fav) => (
                          <button
                            key={fav.id}
                            onClick={() => setSearch(fav.name)}
                            style={{
                              width: '100%',
                              background: 'rgba(231,76,60,0.2)',
                              border: '2px solid #e74c3c',
                              borderRadius: '8px',
                              padding: '8px',
                              marginBottom: '8px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px'
                            }}
                          >
                            <img src={fav.sprite} alt={fav.name} style={{ width: '40px', height: '40px' }} />
                            <span style={{ color: '#2c3e50', fontWeight: '700', textTransform: 'capitalize' }}>
                              {fav.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
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