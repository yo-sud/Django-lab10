function MovieSearch({ id, value, onChange, placeholder, label }) {
  return (
    <>
      <label className="visually-hidden" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type="search"
        className="movie-search__input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </>
  )
}

export default MovieSearch
