import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const {isOpen, onClose, onAddPlace} = props;

  const name = useRef();
  const link = useRef();
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace({
      name: name.current.value,
      link: link.current.value
    });
  }

  return (
    <PopupWithForm
      title='Новое место'
      name='add'
      buttonText='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
          <input ref={name} className="popup__input popup__input_type_name" type="text" name="name" placeholder="Название" autocomplete="off" id="add-popup-name-input" minlength="2" maxlength="30" required />
          <span className="popup__input-error add-popup-name-input-error"></span>
      </label>
      <label className="popup__field">
          <input ref={link} className="popup__input popup__input_type_link" type="url" name="link" placeholder="Ссылка на картинку" autocomplete="off" id="add-popup-link-input" required />
          <span className="popup__input-error add-popup-link-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup