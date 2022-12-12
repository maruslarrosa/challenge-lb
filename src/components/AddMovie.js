import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useContext, useRef, useState } from "react";
import { Button, DragAndDrop } from "./index";
import { close } from "../assets/index";
import { GlobalContext } from "../GlobalContext";

export const AddMovie = ({ setOpenAddMovie }) => {
  const [file, setFile] = useState(null);
  const movieInputRef = useRef("");
  const [movieTitle, setMovieTitle] = useState("");
  const [progress, setProgress] = useState(0);
  const [errorLoad, setErrorLoad] = useState(false);
  const [movieUploaded, setMovieUploaded] = useState(false);
  const isMobile = useContext(GlobalContext);
  const reader = new FileReader();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleAddFile = (file) => {
    reader.addEventListener("load", (event) => {
      setFile(event.target.result);
    });
    // Mocking file uploading time
    setInterval(() => {
      setProgress((progress) => (progress >= 100 ? 100 : progress + 10));
    }, 100);
    reader.readAsDataURL(file);
  };

  const addMovie = () => {
    if (movieInputRef.current.value && file) {
      const movieObject = {
        title: movieTitle,
        backdrop_path: file,
      };
      const previousMovies = JSON.parse(
        window.localStorage.getItem("myMovies")
      );
      previousMovies.push(movieObject);
      try {
        window.localStorage.setItem("myMovies", JSON.stringify(previousMovies));
        setMovieUploaded(true);
      } catch (err) {
        setErrorLoad(true);
      }
    }
  };
  const isDisabled = () => {
    return !movieTitle || !file || progress < 100;
  };

  const dialogCustomStyles = {
    "& .MuiDialog-paper": {
      width: "50rem",
      height: "30rem",
      backgroundColor: "var(--gray)",
      color: "white",
    },
    "& .MuiDialogContent-root": {
      padding: "1rem 4rem",
    },
    "& .MuiDialogTitle-root": {
      fontSize: "1.5rem",
      fontFamily: "inherit",
      letterSpacing: "inherit",
      color: "var(--aqua)",
      fontWeight: "600",
      alignSelf: "center",
      paddingTop: "2rem",
    },
  };

  const inputCustomStyles = {
    "& .MuiInputLabel-root": {
      color: "white",
      fontFamily: "inherit",
    },
    "& .MuiInputLabel-root::after": {
      color: "white",
      fontFamily: "inherit",
    },
    "& .MuiInput-input-root": {
      color: "white",
      fontFamily: "inherit",
    },
    "& .MuiInput-input": {
      color: "white",
      fontFamily: "inherit",
    },
  };

  const dialogContentSX = {
    height: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={() => setOpenAddMovie(false)}
      aria-labelledby="responsive-dialog-title"
      sx={dialogCustomStyles}
      open
    >
      {isMobile ? null : (
        <DialogActions sx={{ padding: "1rem 1rem" }}>
          <img
            src={close}
            alt="Cerrar menú"
            onClick={() => setOpenAddMovie(false)}
            className="close"
          />
        </DialogActions>
      )}
      {movieUploaded ? (
        <>
          <DialogTitle id="responsive-dialog-title">LITEFLIX</DialogTitle>
          <DialogContent>
            <Box sx={dialogContentSX}>
              <strong>¡FELICITACIONES!</strong>
              <p>{`${movieTitle} fue correctamente subida.`}</p>

              <Button
                handleButtonClick={() => setOpenAddMovie(false)}
                label="Volver al home"
                text="Volver al home"
                type="white"
              />
            </Box>
          </DialogContent>
        </>
      ) : (
        <>
          <DialogTitle id="responsive-dialog-title">
            AGREGAR PELÍCULA
          </DialogTitle>
          <DialogContent>
            <Box sx={dialogContentSX}>
              {progress ? (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ width: isMobile ? "15rem " : "30rem", mr: 1 }}>
                    {errorLoad ? (
                      <p>ERROR, NO SE PUDO CARGAR LA PELÍCULA</p>
                    ) : (
                      <p>CARGANDO</p>
                    )}
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      color={errorLoad ? "error" : "primary"}
                    />
                  </Box>
                  <Box sx={{ minWidth: 35 }}>
                    {errorLoad ? null : (
                      <Typography variant="body2" color="white">{`${Math.round(
                        progress
                      )}%`}</Typography>
                    )}
                  </Box>
                </Box>
              ) : (
                <DragAndDrop handleAddFile={handleAddFile} />
              )}

              <TextField
                id="movieTitle"
                label="TÍTULO"
                variant="standard"
                required
                inputRef={movieInputRef}
                onChange={() => setMovieTitle(movieInputRef.current.value)}
                sx={inputCustomStyles}
              />
              <Button
                handleButtonClick={addMovie}
                label="Subir película"
                text="subir película"
                type="white"
                disabled={isDisabled()}
              />
              {isMobile ? (
                <Button
                  handleButtonClick={() => setOpenAddMovie(false)}
                  label="Salir"
                  text="Salir"
                  type="light"
                />
              ) : null}
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};
