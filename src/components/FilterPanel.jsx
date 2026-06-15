import React, { useEffect, useRef } from 'react';

const FilterPanel = ({
  isOpen,
  onClose,
  tempFilters,
  onTempFilterChange,
  onApply,
  onClear,
  openGroups,
  onToggleGroup,
  artists,
  locations
}) => {
  const panelRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const updateFilter = (field, value) => {
    onTempFilterChange(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="filter-panel is-open" data-filter-panel ref={panelRef}>
      <button className="filter-panel__backdrop" type="button" aria-label="Close filters" onClick={onClose}></button>

      <aside className="filter-drawer" aria-labelledby="filter-title">
        <div className="filter-drawer__header">
          <h2 className="filter-drawer__title" id="filter-title"></h2>
          <button className="filter-drawer__close" type="button" aria-label="Close filters" onClick={onClose}>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className="filter-drawer__groups">
          {/* Artist Group */}
          <section className={`filter-group ${openGroups.artist ? 'is-open' : ''}`}>
            <button
              className="filter-group__toggle"
              type="button"
              aria-expanded={openGroups.artist}
              onClick={() => onToggleGroup('artist')}
            >
              <span className="filter-group__label">Artist</span>
              <span className="filter-group__icon" aria-hidden="true"></span>
            </button>
            <div className="filter-group__body">
              <label className="filter-field filter-field--select">
                <span className="filter-field__label sr-only">Select the artist</span>
                <select
                  className="filter-field__control"
                  name="artist"
                  value={tempFilters.artist}
                  onChange={(e) => updateFilter('artist', e.target.value)}
                >
                  <option value="">Select the artist</option>
                  {artists.map(artist => (
                    <option key={artist.id} value={artist.id}>{artist.name}</option>
                  ))}
                </select>
                <span className="filter-field__chevron" aria-hidden="true"></span>
              </label>
            </div>
          </section>

          {/* Location Group */}
          <section className={`filter-group ${openGroups.location ? 'is-open' : ''}`}>
            <button
              className="filter-group__toggle"
              type="button"
              aria-expanded={openGroups.location}
              onClick={() => onToggleGroup('location')}
            >
              <span className="filter-group__label">Location</span>
              <span className="filter-group__icon" aria-hidden="true"></span>
            </button>
            <div className="filter-group__body">
              <label className="filter-field filter-field--select">
                <span className="filter-field__label sr-only">Select the location</span>
                <select
                  className="filter-field__control"
                  name="location"
                  value={tempFilters.location}
                  onChange={(e) => updateFilter('location', e.target.value)}
                >
                  <option value="">Select the location</option>
                  {locations.map(location => (
                    <option key={location.id} value={location.id}>{location.name}</option>
                  ))}
                </select>
                <span className="filter-field__chevron" aria-hidden="true"></span>
              </label>
            </div>
          </section>

          {/* Years Group */}
          <section className={`filter-group ${openGroups.years ? 'is-open' : ''}`}>
            <button
              className="filter-group__toggle"
              type="button"
              aria-expanded={openGroups.years}
              onClick={() => onToggleGroup('years')}
            >
              <span className="filter-group__label">Years</span>
              <span className="filter-group__icon" aria-hidden="true"></span>
            </button>
            <div className="filter-group__body">
              <div className="filter-years">
                <label className="filter-field">
                  <span className="filter-field__label sr-only">Year from</span>
                  <input
                    type="number"
                    className="filter-field__control"
                    name="year-from"
                    placeholder="From"
                    min="0"
                    inputMode="numeric"
                    value={tempFilters.yearFrom}
                    onChange={(e) => updateFilter('yearFrom', e.target.value)}
                  />
                </label>
                <span className="filter-years__divider" aria-hidden="true"></span>
                <label className="filter-field">
                  <span className="filter-field__label sr-only">Year to</span>
                  <input
                    type="number"
                    className="filter-field__control"
                    name="year-to"
                    placeholder="To"
                    min="0"
                    inputMode="numeric"
                    value={tempFilters.yearTo}
                    onChange={(e) => updateFilter('yearTo', e.target.value)}
                  />
                </label>
              </div>
            </div>
          </section>
        </div>

        <div className="filter-drawer__actions">
          <button className="filter-drawer__action filter-drawer__action--primary" type="button" onClick={onApply}>
            Show the results
          </button>
          <button className="filter-drawer__action filter-drawer__action--secondary" type="button" onClick={onClear}>
            Clear
          </button>
        </div>
      </aside>
    </div>
  );
};

export default FilterPanel;