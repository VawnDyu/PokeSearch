import React from 'react';

const LoadingScreen = ({ message }) => (
  <div className="loading">
    <div className="pokeball-loader"></div>
    <p>{message}</p>
  </div>
);

export default LoadingScreen;