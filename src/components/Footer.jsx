function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__brand">
            <div className="logo">CINE<span className="logo__accent">PLUS</span></div>
            <p className="footer__text">
              La mejor experiencia de cine con imagen y sonido de alta calidad.
            </p>
          </div>
          <div className="footer__contact">
            <h3 className="footer__title">Contacto</h3>
            <ul className="footer__list">
              <li className="footer__item">Av. Cinema 123, Ciudad</li>
              <li className="footer__item">contacto@cineplus.com</li>
              <li className="footer__item">+52 55 0000 0000</li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p>&copy; 2026 Cine Plus. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
