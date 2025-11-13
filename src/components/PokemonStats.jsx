import React from 'react';
import { getStatPercentage, getStatColor, formatStatName } from '../utils';

const PokemonStats = ({ stats, translations }) => (
  <div className="stats-section">
    <h3 className="section-title">{translations.baseStats}</h3>
    <div className="stats-list">
      {stats.map((stat) => (
        <div key={stat.stat.name} className="stat-row">
          <span className="stat-name">
            {formatStatName(stat.stat.name)}
          </span>
          <div className="stat-bar-bg">
            <div
              className="stat-bar"
              style={{
                width: `${getStatPercentage(stat.base_stat)}%`,
                backgroundColor: getStatColor(stat.base_stat)
              }}
            ></div>
          </div>
          <span className="stat-value">{stat.base_stat}</span>
        </div>
      ))}
    </div>
  </div>
);

export default PokemonStats;