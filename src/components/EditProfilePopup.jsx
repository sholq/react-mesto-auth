import { useState ,useContext, useEffect, useRef } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const {isOpen, onClose, onUpdateUser} = props;

  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');

  const [isNameValid, setIsNameValid] = useState(true);
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [nameValidationMessage, setNameValidationMessage] = useState('');

  const [isAboutValid, setIsAboutValid] = useState(true);
  const [isAboutEmpty, setIsAboutEmpty] = useState(false);
  const [aboutValidationMessage, setAboutValidationMessage] = useState('');

  const nameInput = useRef();
  const aboutInput = useRef();

  const handleNameChange = (evt) => {
    setName(evt.target.value);
    setIsNameValid(evt.target.validity.valid);
    setNameValidationMessage(evt.target.validationMessage);
    (evt.target.value === '') ? setIsNameEmpty(true) : setIsNameEmpty(false);
  }
  
  const handleAboutChange = (evt) => {
    setAbout(evt.target.value);
    setIsAboutValid(evt.target.validity.valid);
    setAboutValidationMessage(evt.target.validationMessage);
    (evt.target.value === '') ? setIsAboutEmpty(true) : setIsAboutEmpty(false);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    return onUpdateUser({
      name,
      about
    });
  }

  useEffect(() => {
    setTimeout(() => {
      setName(currentUser.name);
      setAbout(currentUser.about);
      setNameValidationMessage('');
      setAboutValidationMessage('');
      setIsNameValid(true);
      setIsAboutValid(true);
      setIsNameEmpty(false);
      setIsAboutEmpty(false);
    }, 501)
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='edit'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isNameValid && isAboutValid}
      isEmpty={isNameEmpty || isAboutEmpty}
    >
      <label className="popup__field">
          <input ref={nameInput} className={"popup__input" + (!isNameValid ? " popup__input_invalid" : "")} type="text" name="name" value={name} placeholder="Имя" autocomplete="off" minlength="2" maxlength="40" required onChange={handleNameChange}/>
          <span className="popup__input-error">{nameValidationMessage}</span>
      </label>
      <label className="popup__field">
          <input ref={aboutInput} className={"popup__input" + (!isAboutValid ? " popup__input_invalid" : "")} type="text" name="about" value={about} placeholder="О себе" autocomplete="off"  minlength="2" maxlength="200" required onChange={handleAboutChange}/>
          <span className="popup__input-error">{aboutValidationMessage}</span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup