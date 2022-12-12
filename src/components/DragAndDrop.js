import "../styles/draganddrop.css";
import { FileUploader } from "react-drag-drop-files";
import { clip } from '../assets/index'


const fileTypes = ["JPG", "PNG", "GIF"];

export const DragAndDrop = ({ handleAddFile }) => {


  const children = (
    <div className="drag-container">
      <img className="icon-modal" src={clip} alt="Ícono de adjunto" />
      <p>AGREGÁ UN ARCHIVO O ARRASTRALO Y SOLTALO AQUÍ</p>
    </div>
  );

  return (
    <FileUploader
      handleChange={handleAddFile}
      name="file"
      types={fileTypes}
      children={children}
    />
  );
};
