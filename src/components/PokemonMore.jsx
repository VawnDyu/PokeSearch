import React from 'react';
import { getEvolutionChain, formatMoveName } from '../utils';

const PokemonMore = ({
  evolution,
  moves,
  compareList,
  onEvolutionClick,
  onRemoveFromCompare,
  translations
}) => (
  <>
    {/* Evolution Chain */}
    {evolution && (
      <div style={{ marginBottom: '15px' }}>
        <h3 className="section-title">{translations.evolution}</h3>
        <div style={{
          background: 'rgba(255,255,255,0.8)',
          padding: '10px',
          borderRadius: '10px',
          border: '2px solid rgba(44,62,80,0.2)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
          }}>
            {getEvolutionChain(evolution.chain).map((evo, idx) => (
              <React.Fragment key={evo.name}>
                <button
                  onClick={() => onEvolutionClick(evo.name)}
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
        <h3 className="section-title">{translations.moves} (20)</h3>
        <div style={{
          background: 'rgba(255,255,255,0.8)',
          padding: '10px',
          borderRadius: '10px',
          border: '2px solid rgba(44,62,80,0.2)',
          maxHeight: '250px',
          overflowY: 'auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '6px'
          }}>
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
                {formatMoveName(move.move.name)}
              </div>
            ))}
          </div>
        </div>
      </div>
    )}

    {/* Compare List */}
    {compareList.length > 0 && (
      <div style={{ marginTop: '15px' }}>
        <h3 className="section-title">
          {translations.compare} ({compareList.length}/3)
        </h3>
        <div style={{
          background: 'rgba(255,255,255,0.8)',
          padding: '10px',
          borderRadius: '10px',
          border: '2px solid rgba(44,62,80,0.2)'
        }}>
          {compareList.map((comp) => (
            <div
              key={comp.id}
              style={{
                background: 'rgba(76,175,80,0.2)',
                border: '1px solid #4CAF50',
                borderRadius: '8px',
                padding: '8px',
                marginBottom: '8px'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '5px'
              }}>
                <span style={{
                  color: '#2c3e50',
                  fontWeight: '700',
                  fontSize: '12px',
                  textTransform: 'capitalize'
                }}>
                  {comp.name}
                </span>
                <button
                  onClick={() => onRemoveFromCompare(comp)}
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
                <div
                  key={stat.stat.name}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '10px',
                    color: '#2c3e50',
                    marginBottom: '2px'
                  }}
                >
                  <span style={{ textTransform: 'capitalize' }}>
                    {stat.stat.name.split('-')[0]}
                  </span>
                  <span style={{ fontWeight: '700' }}>{stat.base_stat}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )}
  </>
);

export default PokemonMore;