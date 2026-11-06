import { useState } from 'react'

function MovieCard({ movie, onBuy }) {
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
        <div className="movie-card__schedules">
          <strong>Elige un horario:</strong>
          <ul className="movie-card__times">
            {movie.schedule.map((time) => (
              <li key={time}>
                <button
                  type="button"
                  className={`time-btn ${selectedTime === time ? 'time-btn--active' : ''}`}
                  onClick={() => selectTime(time)}
                  aria-pressed={selectedTime === time}
                >
                  {time}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="btn movie-card__buy"
          onClick={handleBuy}
          disabled={!selectedTime}
        >
          {confirmed ? '¡Entrada reservada!' : 'Comprar entrada'}
        </button>
      </div>
    </article>
  )
}

export default MovieCard
