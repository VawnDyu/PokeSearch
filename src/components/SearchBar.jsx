import React from 'react';

const SearchBar = ({ value, onChange, onSearch, onKeyPress, placeholder, disabled }) => (
  <div className="search-form">
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      className="search-input"
      disabled={disabled}
    />
    <button
      onClick={onSearch}
      className="search-button"
      disabled={disabled}
    >
      {disabled ? "..." : "→"}
    </button>
  </div>
);

export default SearchBar;