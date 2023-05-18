import { useRef, useState, useMemo, useCallback } from 'react' 
import { searchMovies } from '../services/movies' 
//useMemo sirve para guardar o recalcular un valor c/vez que la dependencia cambie.
//useCallback es igual que useMemo pero para funciones.


export function useMovies({ search, sort }) {

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previusSearch = useRef(search)


  const getMovies = useCallback(async ({search}) => {
      if (search === previusSearch.current) return
      try {
        setLoading(true)
        setError(null)
        previusSearch.current = search
        const newMovies = await searchMovies({ search })
        setMovies(newMovies)
      } catch (e) {
        setError(e.message)
      } finally { //se ejecuta tanto si entra al try como al catch
        setLoading(false)
      }
    }, [])

  const sortedMovies = useMemo(() => {
    return sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading, error }
}