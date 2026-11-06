import { useState } from 'react'
import Button from './Button.jsx'

function MovieCard({ movie, onBuy, isFavorite, onToggleFavorite }) {
  const [selectedTime, setSelectedTime] = useState(null)
  const [confirmed, setConfirmed] = useState(false)

  const selectTime = (time) => {
    setSelectedTime(time)
    setConfirmed(false)
  }

  const handleBuy = () => {
    if (!selectedTime) return
    onBuy()
    setConfirmed(true)
  }

  return (
    <article className="movie-card">
      <div className="movie-card__poster">
        <img src={movie.image} alt={`Poster de ${movie.title}`} loading="lazy" decoding="async" />
        <span className="movie-card__classification">{movie.classification}</span>
      </div>
      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.title}</h3>
        <div className="movie-card__rating">
          <span aria-hidden="true">★</span> {movie.rating}
        </div>
        <Button
          variant={isFavorite ? 'danger' : 'ghost'}
          className="movie-card__fav"
          onClick={() => onToggleFavorite(movie.id)}
          aria-pressed={isFavorite}
        >
          {isFavorite ? '★ En favoritas' : '☆ Añadir a favoritas'}
        </Button>
        <div className="movie-card__schedules">
          <strong>Elige un horario:</strong>
          <ul className="movie-card__times">
            {movie.schedule.map((time) => (
              <li key={time}>
                <Button
                  variant="ghost"
                  className={`time-btn ${selectedTime === time ? 'time-btn--active' : ''}`}
                  onClick={() => selectTime(time)}
                  aria-pressed={selectedTime === time}
                >
                  {time}
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <Button
          variant="primary"
          className="movie-card__buy"
          onClick={handleBuy}
          disabled={!selectedTime}
        >
          {confirmed ? '¡Entrada reservada!' : 'Comprar entrada'}
        </Button>
      </div>
    </article>
  )
}

export default MovieCard
