import { useState ,useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const {isOpen, OnClose, onUpdateUser} = props;

  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  }
  
  const handleAboutChange = (evt) => {
    setAbout(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({name, about});
  }

  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='edit'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={OnClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
          <input className="popup__input popup__input_type_name" type="text" name="name" value={name} placeholder="Имя" autocomplete="off" id="edit-popup-name-input" minlength="2" maxlength="40" required onChange={handleNameChange}/>
          <span className="popup__input-error edit-popup-name-input-error"></span>
      </label>
      <label className="popup__field">
          <input className="popup__input popup__input_type_description" type="text" name="about" value={about} placeholder="О себе" autocomplete="off" id="edit-popup-description-input"  minlength="2" maxlength="200" required onChange={handleAboutChange}/>
          <span className="popup__input-error edit-popup-description-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup