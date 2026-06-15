import React from 'react';
import ThemeToggle from './ThemeToggle';

const Header = ({ theme, setTheme }) => {
  return (
    <header className="header">
      <div className="header__inner">
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
    </header>
  );
};

export default Header;