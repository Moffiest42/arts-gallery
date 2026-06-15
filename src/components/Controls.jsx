import React from 'react';
import searchIcon from '../assets/icons/search_icon.svg';
import filterIcon from '../assets/icons/filter_icon.svg';

const Controls = ({ searchTerm, onSearchChange, onFilterOpen }) => {
  return (
    <div className="controls">
      <div className="search">
        <img src={searchIcon} alt="" className="search__icon" />
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
        <img src={filterIcon} alt="" className="filter-btn__icon" />
      </button>
    </div>
  );
};

export default Controls;