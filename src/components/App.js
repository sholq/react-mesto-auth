import React from 'react';
import '../App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  
  const [userName, setUserName] = React.useState('');
  const [userDescription , setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');

  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      });
  }, []);
  
  
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  return (
    <div className="page">
      <Header />
      <Main  onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        userName={userName}
        userDescription={userDescription}
        userAvatar={userAvatar} />
      <Footer />
      <PopupWithForm title='Редактировать профиль' name='edit' children={
        <>
          <label className="popup__field">
            <input className="popup__input popup__input_type_name" type="text" name="name" value="" autocomplete="off" id="edit-popup-name-input" minlength="2" maxlength="40" required />
            <span className="popup__input-error edit-popup-name-input-error"></span>
          </label>
          <label className="popup__field">
            <input className="popup__input popup__input_type_description" type="text" name="about" value="" autocomplete="off" id="edit-popup-description-input"  minlength="2" maxlength="200" required />
            <span className="popup__input-error edit-popup-description-input-error"></span>
          </label>
          <button className="popup__save-button" type="submit">Сохранить</button>
        </>
      } isOpen={isEditProfilePopupOpen} onClose={() => {
        setIsEditProfilePopupOpen(false);
      }} />
      <PopupWithForm title='Новое место' name='add' children={
        <>
          <label className="popup__field">
            <input className="popup__input popup__input_type_name" type="text" name="name" placeholder="Название" autocomplete="off" id="add-popup-name-input" minlength="2" maxlength="30" required />
            <span className="popup__input-error add-popup-name-input-error"></span>
          </label>
          <label className="popup__field">
            <input className="popup__input popup__input_type_link" type="url" name="link" placeholder="Ссылка на картинку" autocomplete="off" id="add-popup-link-input" required />
            <span className="popup__input-error add-popup-link-input-error"></span>
          </label>
          <button className="popup__save-button" type="submit">Создать</button>
        </>
      } isOpen={isAddPlacePopupOpen} onClose={() => {
        setIsAddPlacePopupOpen(false);
      }} />
      <PopupWithForm title='Обновить аватар' name='avatar' children={
        <>
          <label className="popup__field">
            <input className="popup__input popup__input_type_link" type="url" name="avatar" placeholder="Ссылка на картинку" autocomplete="off" id="edit-avatar-popup-link-input" required />
            <span className="popup__input-error edit-avatar-popup-link-input-error"></span>
          </label>
          <button className="popup__save-button" type="submit">Сохранить</button>
        </>
      } isOpen={isEditAvatarPopupOpen} onClose={() => {
        setIsEditAvatarPopupOpen(false);
      }} />
      <PopupWithForm title='Вы уверены?' name='confirm' children={
        <>
          <button className="popup__save-button popup__save-button_type_confirm">Да</button>
        </>
      } />
      <ImagePopup />
    </div>
  );
}

export default App;