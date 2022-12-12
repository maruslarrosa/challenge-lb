import './App.css';
import { GlobalContext } from './GlobalContext'
import { MainContainer } from './components/index'
import { useEffect, useState}  from 'react'

function App() {
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowResizing() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowResizing);
    return () => {
      window.removeEventListener("resize", handleWindowResizing);
    };
  }, []);

  useEffect(() =>  {
    if(!window.localStorage.getItem('myMovies')) {
      window.localStorage.setItem('myMovies', JSON.stringify([]))
    }
  }, [])

  const isMobile = width <= 500;

  return (
    <div className='App'>
      <GlobalContext.Provider value={isMobile}>
        <MainContainer />
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
