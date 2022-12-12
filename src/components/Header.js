import "../styles/header.css";
import { GlobalContext } from "../GlobalContext";
import { AddMovie, Button } from "./index";
import { add, close, menu, notification, profile } from "../assets/index";
import { useContext,  useState } from "react";
import { Drawer } from "@mui/material";

const menuOptions = [
  "INICIO",
  "SERIES",
  "PELICULAS",
  "AGREGADAS RECIENTEMENTE",
  "POPULARES",
  "MIS PELÍCULAS",
  "MI LISTA",
];

export const Header = () => {
  const isMobile = useContext(GlobalContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openAddMovie, setOpenAddMovie] = useState(false);

  const actionButtons = () => {
    return (
      <div className="action-buttons">
        <img
          src={notification}
          className="icon"
          alt="Ícono de notificaciones"
        />
        <img src={profile} className="icon" alt="Ícono de perfil de usuario" />
      </div>
    );
  };

  const renderDesktop = () => {
    return (
      <>
        <div className="header-section">
          <div className="section-left">
            <p className="logo">
              <strong>LITE</strong>FLIX
            </p>
            <Button
              text="Agregar Pelicula"
              label="Agregar Pelicula"
              icon={add}
              type="plain"
              handleButtonClick={() => setOpenAddMovie(true)}
            />
          </div>
        </div>
        <div className="header-section">
          <div className="section-right">
            <img
              src={menu}
              className="icon"
              alt="Ícono de menu"
              onClick={() => setMenuOpen(true)}
            />
            {actionButtons()}
          </div>
        </div>
      </>
    );
  };

  const renderMobile = () => {
    return (
      <>
        <div className="mobile-section">
          <img
            src={menu}
            className="icon"
            alt="Ícono de menu"
            onClick={() => setMenuOpen(true)}
          />
          {actionButtons()}
        </div>
      </>
    );
  };

  const handleAddMovieClick = () => {
    setOpenAddMovie(true)
    setMenuOpen(false)
  }


  const drawerCustomStyles = {
    "& .MuiDrawer-paper": {
      width: isMobile ? "100%" : "50%",
      backgroundColor: isMobile ? "var(--gray)" : "transparent",
    },
  };

  return (
    <div>
      <div className="header-container">
        {isMobile ? renderMobile() : renderDesktop()}
      </div>
      <Drawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        anchor={isMobile ? "left" : "right"}
        sx={drawerCustomStyles}
      >
        <div className="drawer-container">
          <div className="menu-icons">
            <img
              src={close}
              alt="Cerrar menú"
              onClick={() => setMenuOpen(false)}
              className="close"
            />
            {actionButtons()}
          </div>
          {menuOptions.map((option) => {
            return <div className="option" key={option}>{option}</div>;
          })}
          <Button
            text="Agregar Pelicula"
            label="Agregar Pelicula"
            icon={add}
            type="plain"
            handleButtonClick={handleAddMovieClick}
          />
          <div className="option">CERRAR SESIÓN</div>
        </div>
      </Drawer>

      {openAddMovie ? <AddMovie setOpenAddMovie={setOpenAddMovie} /> : null}
    </div>
  );
};
