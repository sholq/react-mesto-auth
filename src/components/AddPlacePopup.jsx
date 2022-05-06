import { useState, useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const {isOpen, onClose, onAddPlace} = props;

  const name = useRef();
  const link = useRef();

  const [isNameValid, setIsNameValid] = useState(true);
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [nameValidationMessage, setNameValidationMessage] = useState('');

  const [isLinkValid, setIsLinkValid] = useState(true);
  const [isLinkEmpty, setIsLinkEmpty] = useState(false);
  const [linkValidationMessage, setLinkValidationMessage] = useState('');

  const handleNameChange = (evt) => {
    setIsNameValid(evt.target.validity.valid);
    setNameValidationMessage(evt.target.validationMessage);
    (evt.target.value === '') ? setIsNameEmpty(true) : setIsNameEmpty(false);
  }

  const handleLinkChange = (evt) => {
    setIsLinkValid(evt.target.validity.valid);
    setLinkValidationMessage(evt.target.validationMessage);
    (evt.target.value === '') ? setIsLinkEmpty(true) : setIsLinkEmpty(false);
  }
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    return onAddPlace({
      name: name.current.value,
      link: link.current.value
    });
  }

  useEffect(() => {
    setTimeout(() => {
      name.current.value = '';
      link.current.value = '';
      setNameValidationMessage('');
      setLinkValidationMessage('');
      setIsNameValid(true);
      setIsNameEmpty(true);
      setIsLinkValid(true);
      setIsLinkEmpty(true);
    }, 501)
  }, [isOpen]);

  return (
    <PopupWithForm
      title='Новое место'
      name='add'
      buttonText='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isNameValid && isLinkValid}
      isEmpty={isNameEmpty || isLinkEmpty}
    >
      <label className="popup__field">
          <input ref={name} className={"popup__input" + (!isNameValid ? " popup__input_invalid" : "")} type="text" name="name" placeholder="Название" autocomplete="off" minlength="2" maxlength="30" required onChange={handleNameChange}/>
          <span className="popup__input-error">{nameValidationMessage}</span>
      </label>
      <label className="popup__field">
          <input ref={link} className={"popup__input" + (!isLinkValid ? " popup__input_invalid" : "")} type="url" name="link" placeholder="Ссылка на картинку" autocomplete="off" required onChange={handleLinkChange}/>
          <span className="popup__input-error">{linkValidationMessage}</span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup