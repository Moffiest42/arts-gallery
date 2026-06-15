import React from 'react';

const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <button className="theme-toggle" type="button" aria-label="Toggle theme" onClick={toggleTheme}>
      <img
        src={theme === 'dark' ? "/assets/icons/light_icon.svg" : "/assets/icons/dark_icon.svg"}
        alt=""
        className="theme-toggle__icon"
      />
    </button>
  );
};

export default ThemeToggle;