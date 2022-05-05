import {useState, useEffect} from 'react';
import '../App.css';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';

function App() {
  const [currentUser, setCurrentUser] = useState({});

  const [selectedCard, setSelectedCard] = useState({});

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  useEffect(() => {
    api.getUserInfo()
      .then(userData => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
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
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />
        <PopupWithForm
          title='Редактировать профиль'
          name='edit'
          buttonText='Сохранить'
          isOpen={isEditProfilePopupOpen}
          onClose={() => {
            setIsEditProfilePopupOpen(false);
          }}>
          <label className="popup__field">
              <input className="popup__input popup__input_type_name" type="text" name="name" value="" placeholder="Имя" autocomplete="off" id="edit-popup-name-input" minlength="2" maxlength="40" required />
              <span className="popup__input-error edit-popup-name-input-error"></span>
            </label>
            <label className="popup__field">
              <input className="popup__input popup__input_type_description" type="text" name="about" value="" placeholder="О себе" autocomplete="off" id="edit-popup-description-input"  minlength="2" maxlength="200" required />
              <span className="popup__input-error edit-popup-description-input-error"></span>
            </label>
        </PopupWithForm>
        <PopupWithForm
          title='Новое место'
          name='add'
          buttonText='Создать'
          isOpen={isAddPlacePopupOpen}
          onClose={() => {
            setIsAddPlacePopupOpen(false);
          }}>
            <label className="popup__field">
              <input className="popup__input popup__input_type_name" type="text" name="name" placeholder="Название" autocomplete="off" id="add-popup-name-input" minlength="2" maxlength="30" required />
              <span className="popup__input-error add-popup-name-input-error"></span>
            </label>
            <label className="popup__field">
              <input className="popup__input popup__input_type_link" type="url" name="link" placeholder="Ссылка на картинку" autocomplete="off" id="add-popup-link-input" required />
              <span className="popup__input-error add-popup-link-input-error"></span>
            </label>
        </PopupWithForm>
        <PopupWithForm
          title='Обновить аватар'
          name='avatar'
          buttonText='Сохранить'
          isOpen={isEditAvatarPopupOpen}
          onClose={() => {
            setIsEditAvatarPopupOpen(false);
        }}>
          <label className="popup__field">
            <input className="popup__input popup__input_type_link" type="url" name="avatar" placeholder="Ссылка на картинку" autocomplete="off" id="edit-avatar-popup-link-input" required />
            <span className="popup__input-error edit-avatar-popup-link-input-error"></span>
            </label>
          </PopupWithForm>
          <PopupWithForm
            title='Вы уверены?'
            name='confirm'
            buttonText='Да'
          />
          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={() => {
              setIsImagePopupOpen(false);
            }}
          />
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;