import Popup from "./Popup";
import errorIcon from "../image/Error.svg";
import successIcon from "../image/Success.svg";

function InfoTooltip(props) {
  const {isFail, isOpen, onClose} = props;

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="popup__icon" style={
        isFail ? {backgroundImage: `url(${errorIcon})`} : {backgroundImage: `url(${successIcon})`}
      } />
      <p className="popup__caption">
        {
          isFail ? "Что-то пошло не так! Попробуйте еще раз" : "Вы успешно зарегистрировались!"
        }
      </p>
    </Popup>
  )
}

export default InfoTooltip;