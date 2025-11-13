import React from 'react';

const WelcomeScreen = ({ favorites, onFavoriteClick, translations }) => (
  <>
    <div className="welcome-state">
      <div className="pokeball-icon">
        <img src="./pokeball.png" alt="Pokeball" className="pokeball-img" />
      </div>
      <h3>{translations.welcome}</h3>
      <p>{translations.searchPrompt}</p>
    </div>

    {/* Favorites */}
    {favorites.length > 0 && (
      <div style={{ marginTop: '20px' }}>
        <h3 className="section-title">❤️ {translations.favorites}</h3>
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
              onClick={() => onFavoriteClick(fav.name)}
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
              <img
                src={fav.sprite}
                alt={fav.name}
                style={{ width: '40px', height: '40px' }}
              />
              <span style={{
                color: '#2c3e50',
                fontWeight: '700',
                textTransform: 'capitalize'
              }}>
                {fav.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    )}
  </>
);

export default WelcomeScreen;