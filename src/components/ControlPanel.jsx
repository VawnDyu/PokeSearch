import React from 'react';

const ControlPanel = ({ language, soundEnabled, onLanguageChange, onSoundToggle }) => (
  <div style={{
    display: 'flex',
    gap: '5px',
    marginBottom: '10px',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }}>
    {['en', 'es', 'ja'].map((lang) => (
      <button
        key={lang}
        onClick={() => onLanguageChange(lang)}
        style={{
          padding: '6px 12px',
          borderRadius: '8px',
          border: '2px solid #2c3e50',
          background: language === lang ? '#3498db' : 'rgba(255,255,255,0.8)',
          color: language === lang ? 'white' : '#2c3e50',
          fontSize: '11px',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        {lang === 'en' ? 'EN' : lang === 'es' ? 'ES' : '日本'}
      </button>
    ))}
    <button
      onClick={onSoundToggle}
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
);

export default ControlPanel;