import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="language-switcher">
        <button className="btn btn-secondary active" id="btn-en">EN</button>
        <button className="btn btn-secondary" id="btn-de">DE</button>
      </div>
    </header>
  );
}

export default Header;
