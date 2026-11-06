function Hero({ movie }) {
  return (
    <section className="hero">
      <div className="hero__background" style={{ backgroundImage: `url(${movie.image})` }} />
      <div className="container hero__content">
        <span className="hero__badge">Destacado</span>
        <h1 className="hero__title">{movie.title}</h1>
        <p className="hero__synopsis">{movie.synopsis}</p>
        <div className="hero__meta">
          <span className="hero__classification">{movie.classification}</span>
          <span className="hero__rating">
            <span aria-hidden="true">★</span> {movie.rating}
          </span>
        </div>
        <a href="#cartelera" className="btn hero__cta">Ver cartelera</a>
      </div>
    </section>
  )
}

export default Hero
