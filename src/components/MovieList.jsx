import { useState } from 'react'
import MovieCard from './MovieCard.jsx'

function MovieList({ movies, onBuy }) {
  const [query, setQuery] = useState('')
  const [classification, setClassification] = useState('Todas')

  const classifications = ['Todas', ...new Set(movies.map((movie) => movie.classification))]

  const filtered = movies.filter((movie) => {
    const matchesQuery = movie.title.toLowerCase().includes(query.toLowerCase())
    const matchesClassification =
      classification === 'Todas' || movie.classification === classification
    return matchesQuery && matchesClassification
  })

  return (
    <section className="movie-list" id="cartelera">
      <div className="container">
        <h2 className="section-title">Cartelera</h2>

        <div className="movie-list__controls">
          <input
            type="search"
            className="movie-list__search"
            placeholder="Buscar película por título..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Buscar película por título"
          />
          <div className="movie-list__filters" role="group" aria-label="Filtrar por clasificación">
            {classifications.map((option) => (
              <button
                key={option}
                type="button"
                className={`filter-btn ${classification === option ? 'filter-btn--active' : ''}`}
                onClick={() => setClassification(option)}
                aria-pressed={classification === option}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="movie-list__empty">No se encontraron películas con esos criterios.</p>
        ) : (
          <ul className="movie-list__grid" role="list" aria-label="Películas en cartelera">
            {filtered.map((movie) => (
              <li key={movie.id} className="movie-list__item">
                <MovieCard movie={movie} onBuy={onBuy} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default MovieList
