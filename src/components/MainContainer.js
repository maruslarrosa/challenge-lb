import { GlobalContext } from "../GlobalContext"
import { getHighlightedMovie } from "../services/moviesService"
import { Header, Highlighted, Popular } from "./index"
import { useContext, useEffect, useState } from "react"
import '../styles/mainmovie.css'

const imageBaseURL = "https://image.tmdb.org/t/p/original"

export const MainContainer = () => {
  const isMobile = useContext(GlobalContext)
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState(null);
    const [image, setImage] = useState("");

    const backgroundImage = {
      background: `url(${image}) no-repeat center center fixed` ,
      backgroundSize: "cover"
    }

    const backgroundImageMobile = {
      backgroundImage: `url(${image})`,
      overflow: "auto",
      backgroundPosition: "center",
      backgroundSize: "cover",
    };

    useEffect(() => {
        getHighlightedMovie()
          .then((response) => {
            setMovie(response)
            setImage(imageBaseURL + response.backdrop_path);
            setLoading(false);
          })
        return () => {};
    }, []);

    return (
      <>
        {loading ? (
          <p>Cargando</p>
        ) : (
          <div className="main-container" style={
           isMobile ? backgroundImageMobile : backgroundImage}>
            <Header/>
            <div className='content'>
              <Highlighted movie={movie} />
              <Popular />
            </div>
          </div>
        )}
      </>
    );
}