import React from 'react';

const Controls = ({ searchTerm, onSearchChange, onFilterOpen }) => {
  return (
    <div className="controls">
      <div className="search">
        <img src="../assets/icons/search_icon.svg" alt="" className="search__icon" />
        <input
          type="text"
          className="search__input"
          placeholder="Search by painting title"
          aria-label="Search by painting title"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <button className="filter-btn" type="button" aria-label="Open filters" onClick={onFilterOpen}>
        <img src="/assets/icons/filter_icon.svg" alt="" className="filter-btn__icon" />
      </button>
    </div>
  );
};

export default Controls;