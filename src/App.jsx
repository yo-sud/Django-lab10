import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import MovieList from './components/MovieList.jsx'
import Footer from './components/Footer.jsx'
import { movies } from './data/movies.js'

function App() {
  const [tickets, setTickets] = useState(0)
  const [favorites, setFavorites] = useState([])
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const featured = movies[0]

  const handleBuy = () => {
    setTickets((prev) => prev + 1)
  }

  const toggleFavorite = (movieId) => {
    setFavorites((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    )
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('[filtro]', query)
      setDebouncedQuery(query)
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  const handleQueryChange = (value) => {
    console.log('[tecleo]', value)
    setQuery(value)
  }

  return (
    <>
      <Header tickets={tickets} />
      <main>
        <Hero movie={featured} query={query} onQueryChange={handleQueryChange} />
        <MovieList
          movies={movies}
          onBuy={handleBuy}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          query={query}
          onQueryChange={handleQueryChange}
          debouncedQuery={debouncedQuery}
        />
      </main>
      <Footer />
    </>
  )
}

export default App
