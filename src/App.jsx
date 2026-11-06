import { useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import MovieList from './components/MovieList.jsx'
import Footer from './components/Footer.jsx'
import { movies } from './data/movies.js'

function App() {
  const [tickets, setTickets] = useState(0)
  const featured = movies[0]

  const handleBuy = () => {
    setTickets((prev) => prev + 1)
  }

  return (
    <>
      <Header tickets={tickets} />
      <main>
        <Hero movie={featured} />
        <MovieList movies={movies} onBuy={handleBuy} />
      </main>
      <Footer />
    </>
  )
}

export default App
