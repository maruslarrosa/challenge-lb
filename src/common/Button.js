import './button.css'

export const Button = ({ text, icon=null, disabled=false, label, type, handleButtonClick=()=>{}}) => {
  return (
    <button
      className={`button ${type}`}
      label={label}
      onClick={handleButtonClick}
      disabled={disabled}
    >
      {icon ? <img src={icon} alt="icon" /> : null}
      {text}
    </button>
  );
}