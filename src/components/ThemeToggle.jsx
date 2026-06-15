import React from 'react';

const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <button className="theme-toggle" type="button" aria-label="Toggle theme" onClick={toggleTheme}>
      <img
        src={theme === 'dark' 
          ? `${import.meta.env.BASE_URL}assets/icons/light_icon.svg` 
          : `${import.meta.env.BASE_URL}assets/icons/dark_icon.svg`
        }
        alt=""
        className="theme-toggle__icon"
      />
    </button>
  );
};

export default ThemeToggle;