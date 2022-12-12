import '../styles/popular.css'
import { useEffect, useState } from "react";
import Select , { components } from 'react-select';
import { check } from '../assets/index'
import { MovieCard } from "./MovieCard"
import { getPopularMovies } from "../services/moviesService";

const popular = { value: "popular", label: "POPULARES", icon: check}
const personal =  { value: "misPeliculas", label: "MIS PELÍCULAS" }

export const Popular = () => {
    const [loading, setLoading] = useState(true);
    const [movieList, setMovieList] = useState([]);
    const options = [popular, personal];
    const [selectedOption, setSelectedOption] = useState(popular);
    const [menuOpen, setMenuOpen] = useState(false);

    const { Option } = components

    useEffect(() => {
        if(selectedOption === popular ){
            getPopularMovies().then((data) => {
                const firstFour = data.slice(0,4)
                setMovieList(firstFour)
                setLoading(false)
            })
        } else {

            const myMovies = JSON.parse(window.localStorage.getItem('myMovies')).slice(0,4)
            setMovieList(myMovies)
        }
        return () => {
        };
    }, [selectedOption]);

    const IconOption = props => {
      return (
        <Option {...props}>
          {props.data.label}
          {props.isSelected ? (
            <img src={check} style={{ width: "1rem" }} alt={props.data.label} />
          ) : null}
        </Option>
      );
    }
    
    const dropdownStyles = (menuOpen) => ({
      control: (baseStyles, state) => ({
        ...baseStyles,
      }),
      menu: (baseStyles) => ({
        ...baseStyles,
        backgroundColor: "var(--gray)",
        marginTop: 0,
        borderwidth: 10,
        fontSize: "1rem",
        height: menuOpen ? "5rem" : "0px",
        width: "12rem",
        overflow: "hidden",
        opacity: menuOpen ? 1 : 0,
        transition: "all 500ms ease-in-out",
        visibility: menuOpen ? "visible" : "hidden",
      }),
      container: (baseStyles, state) => ({
        ...baseStyles,
        position: "relative",
        boxSizing: "border-box",
        width: "12rem",
        fontSize: "1.5rem",
        fontWeight: "600",
        letterSpacing: "4px",
      }),
      option: (base, state) => ({
        ...base,
        height: "2.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 1rem", 
        fontWeight: "400", 
        color: "white",
      })
    });

    return (
      <>
        {loading ? (
          <p>Loading</p>
        ) : (
          <div className="popular-container">
            <div className="selector-container" >
              <p className='plain-text'>
                VER:
              </p>
              <div >
                
                <Select
                  defaultValue={selectedOption}
                  options={options}
                  onBlur={() => setMenuOpen(false)}
                  onMenuOpen={() => setMenuOpen(true)}
                  blurInputOnSelect={true}
                  onChange={setSelectedOption}
                  unstyled
                  menuIsOpen
                  styles={dropdownStyles(menuOpen)}
                  isSearchable={false}
                  components={{ Option: IconOption }}
                />
              </div>
            </div>
            {movieList.map((movie) => (
              <MovieCard key={movie.title} movie={movie} />
            ))}
          </div>
        )}
      </>
    );
}