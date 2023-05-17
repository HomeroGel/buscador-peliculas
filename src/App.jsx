
import './App.css'
//import { useRef } from 'react' //nos permite crear un valor que persiste entre renderizado a diferencia del useState que cambia el valor y vuelve a renderizar. El useRef puede cambiar su valor y no volver a renderizar
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'




function App() {

  const {movies:mappedMovies} = useMovies()
  const { search, setSearch, error} = useSearch()
  // const inputRef  = useRef()


  const handleSubmit = (e)=>{
    e.preventDefault()

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


  const handleChange = (e) =>{
    setSearch(e.target.value)
  }

  return (
    <div className='page'>
      <header>
        <form className='form'  onSubmit={handleSubmit}>
          <input style={{border: '1px solid transparent', borderColor: error ? 'red' : 'transparent'}} onChange={handleChange} value={search} name='query' /*ref={inputRef}*/ placeholder='Avengers, Stars Wars...' />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{color:'red'}}>{error}</p>}
      </header>

      <main>
        <Movies movies={mappedMovies} />
      </main>
    </div>
  )
}

export default App
