import React from 'react';

const PokedexHeader = () => (
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
);

export default PokedexHeader;