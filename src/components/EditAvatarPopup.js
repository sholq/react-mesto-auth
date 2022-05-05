import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const {isOpen, OnClose, onUpdateAvatar} = props;

  const avatar = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatar.current.value
    })
  }

  return (
    <PopupWithForm
      title='Обновить аватар'
      name='avatar'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={OnClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input ref={avatar} className="popup__input popup__input_type_link" type="url" name="avatar" placeholder="Ссылка на картинку" autocomplete="off" id="edit-avatar-popup-link-input" required />
        <span className="popup__input-error edit-avatar-popup-link-input-error"></span>
        </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup