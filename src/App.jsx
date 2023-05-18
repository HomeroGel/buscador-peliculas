
import { useCallback, useState } from 'react'
import './App.css'
//import { useRef } from 'react' //nos permite crear un valor que persiste entre renderizado a diferencia del useState que cambia el valor y vuelve a renderizar. El useRef puede cambiar su valor y no volver a renderizar
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'



function App() {
  const [sort, setSort] = useState(false)
  const { search, setSearch, error} = useSearch()
  const {movies, loading, getMovies} = useMovies( {search, sort})
  // const inputRef  = useRef()


  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({search})
    }, 500), [getMovies]
  )

  const handleSubmit = (e)=>{
    e.preventDefault()
    getMovies({search})
    // const {query} = Object.fromEntries(
    //   new window.FormData(e.target)
    // )
    
    
    //Con useRef

    // const inputEl = inputRef.current
    // const value = inputEl.value


    //Como traerme el valor del input sin useRef (solo js)'

    // const fields = Object.fromEntries(new window.FormData(e.target))
    // console.log(fields)
  }


  const handleSort = ()=>{
    setSort(!sort)
  }

  const handleChange = (e) =>{
    const newSearch = e.target.value
    setSearch(newSearch)
    debouncedGetMovies(newSearch)
  }


  return (
    <div className='page'>
      <header>
        <form className='form'  onSubmit={handleSubmit}>
          <input style={{border: '1px solid transparent', borderColor: error ? 'red' : 'transparent'}} onChange={handleChange} value={search} name='query' /*ref={inputRef}*/ placeholder='Avengers, Stars Wars...' />
          <input type="checkbox" onChange={handleSort} checked={sort}/>
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{color:'red'}}>{error}</p>}
      </header>

      <main>

        {loading ? <p>Cargando...</p> : <Movies movies={movies} />}

        
      </main>
    </div>
  )
}

export default App
