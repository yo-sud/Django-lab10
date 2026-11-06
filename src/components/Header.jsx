function Header({ tickets }) {
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <div className="logo">CINE<span className="logo__accent">PLUS</span></div>
          <nav className="nav">
            <ul className="nav__list">
              <li className="nav__item"><a href="#cartelera" className="nav__link">Cartelera</a></li>
              <li className="nav__item"><a href="#cartelera" className="nav__link">Estrenos</a></li>
              <li className="nav__item"><a href="#cartelera" className="nav__link">Próximamente</a></li>
            </ul>
          </nav>
          <div className="header__tickets" aria-live="polite">
            <span aria-hidden="true">🎟️</span>
            <span>{tickets} {tickets === 1 ? 'entrada' : 'entradas'}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
