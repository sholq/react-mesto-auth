import { useState, useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const {isOpen, onClose, onUpdateAvatar} = props;

  const [isValid, setIsValid] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);
  const [validationMessage, setValidationMessage] = useState('');

  const [buttonText, setButtonText] = useState('Сохранить');

  const handleChange = (evt) => {
    setIsValid(evt.target.validity.valid);
    setValidationMessage(evt.target.validationMessage);
    (evt.target.value === '') ? setIsEmpty(true) : setIsEmpty(false);
  }

  const avatar = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setButtonText(buttonText + '...');
    onUpdateAvatar({
      avatar: avatar.current.value
    })
      .finally(() => {
        setButtonText(buttonText);
      });
  }

  useEffect(() => {
    setTimeout(() => {
      avatar.current.value = null;
      setValidationMessage('');
      setIsValid(true);
      setIsEmpty(true);
    }, 501)
  }, [isOpen]);

  return (
    <PopupWithForm
      title='Обновить аватар'
      name='avatar'
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      isEmpty={isEmpty}
    >
      <label className="popup__field">
        <input ref={avatar} className={"popup__input" + (!isValid ? " popup__input_invalid" : "")} type="url" name="avatar" placeholder="Ссылка на картинку" autoComplete="off" required onChange={handleChange}/>
        <span className="popup__input-error">{validationMessage}</span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup