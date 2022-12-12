import '../styles/moviecard.css'
import { playmovie, star } from '../assets/index'
import { GlobalContext } from '../GlobalContext'
import { useContext, useState } from 'react'

export const MovieCard = ({ movie }) => {
  const isMobile = useContext(GlobalContext)
  const [selected, setSelected] = useState();
  
  const movieStyle = {
    backgroundImage: `url(${movie.backdrop_path})`
  }
  const selectedMovieStyle = {
    backgroundImage: `url(${movie.backdrop_path})`,
    boxShadow: "inset 0 0 0 1000px rgba(0,0,0,.50)"
  }

  const releaseDate = (new Date(movie.release_date)).getFullYear();

  const handleCardClick = () => {
    setSelected(!selected)
  }

  return (
    <div className="movie-container">
      <div
        className="movie-data"
        style={selected ? selectedMovieStyle : movieStyle}
        onClick={isMobile ? handleCardClick : null}
        onMouseEnter={() => setSelected(true)}
        onMouseLeave={() => setSelected(false)}
      >
        {selected ? (
          <div className="movie-selected">
            <div className="movie-info">
              <div className="left">
                <img
                  src={playmovie}
                  className="selected-icon"
                  alt="Ícono de reproducción"
                />
                <p className="movie-title">{movie.title}</p>
              </div>
            </div>
            {releaseDate && movie.vote_average ? (
              <div className="movie-info">
                <div className="left">
                  <img
                    src={star}
                    className="selected-icon"
                    alt="Icono de calificación"
                  />
                  <p>{movie.vote_average}</p>
                </div>
                <p>{releaseDate}</p>
              </div>
            ) : null}
          </div>
        ) : (
          <>
            <img className="icon" src={playmovie} alt="Ícono de reproducción" />
            <p className="movie-title">{movie.title}</p>
          </>
        )}
      </div>
    </div>
  );
}