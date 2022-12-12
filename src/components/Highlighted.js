import '../styles/highlighted.css'
import { Button } from './index'
import { add, play } from '../assets';

export const Highlighted = ({ movie }) => {
  return (
    <div className="highlighted-container">
      <p className='original'>
        ORIGINAL DE <strong>LITEFLIX</strong>
      </p>
      <h1 className='title'>{movie.title}</h1>
      <div className='button-container'>
        <Button text="REPRODUCIR" icon={play} type="strong"/>
        <Button text="MI LISTA" icon={add} type="light"/>
      </div>
    </div>
  );
};
