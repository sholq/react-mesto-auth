import React from 'react';
import '../App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';

function App() {
  // Переменные состояния
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  
  const [userName, setUserName] = React.useState('');
  const [userDescription , setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');

  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});

  // Эффекты
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  // Обработчики
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  // Разметка
  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        userName={userName}
        userDescription={userDescription}
        userAvatar={userAvatar}
        cards={cards}
      />
      <Footer />
      <PopupWithForm
        title='Редактировать профиль'
        name='edit'
        isOpen={isEditProfilePopupOpen}
        onClose={() => {
          setIsEditProfilePopupOpen(false);
        }}
        children={
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
        }
      />
      <PopupWithForm
        title='Новое место'
        name='add'
        isOpen={isAddPlacePopupOpen}
        onClose={() => {
          setIsAddPlacePopupOpen(false);
        }}
        children={
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
        }
      />
      <PopupWithForm
        title='Обновить аватар'
        name='avatar'
        isOpen={isEditAvatarPopupOpen}
        onClose={() => {
          setIsEditAvatarPopupOpen(false);
        }}
        children={
          <>
            <label className="popup__field">
              <input className="popup__input popup__input_type_link" type="url" name="avatar" placeholder="Ссылка на картинку" autocomplete="off" id="edit-avatar-popup-link-input" required />
              <span className="popup__input-error edit-avatar-popup-link-input-error"></span>
            </label>
            <button className="popup__save-button" type="submit">Сохранить</button>
          </>
        }
      />
      <PopupWithForm
        title='Вы уверены?'
        name='confirm'
        children={
          <>
            <button className="popup__save-button popup__save-button_type_confirm">Да</button>
          </>
        }
      />
      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={() => {
          setIsImagePopupOpen(false);
        }}
      />
    </div>
  );
}

export default App;