import {useState, useEffect} from 'react';
import '../App.css';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
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

  const closeAllPopup = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  }

  const handleUpdateUser = (info) => {
    api.editUserInfo(info)
      .then((info) => {
        setCurrentUser(info);
        closeAllPopup();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleUpdateAvatar = (avatar) => {
    api.editUserAvatar(avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopup();
      })
      .catch((err) => {
        console.log(err);
      });
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
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopup} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopup} onUpdateAvatar={handleUpdateAvatar} />
        <PopupWithForm
          title='Вы уверены?'
          name='confirm'
          buttonText='Да'
        />
        <PopupWithForm
          title='Новое место'
          name='add'
          buttonText='Создать'
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopup}
      >
          <label className="popup__field">
              <input className="popup__input popup__input_type_name" type="text" name="name" placeholder="Название" autocomplete="off" id="add-popup-name-input" minlength="2" maxlength="30" required />
              <span className="popup__input-error add-popup-name-input-error"></span>
          </label>
          <label className="popup__field">
              <input className="popup__input popup__input_type_link" type="url" name="link" placeholder="Ссылка на картинку" autocomplete="off" id="add-popup-link-input" required />
              <span className="popup__input-error add-popup-link-input-error"></span>
          </label>
        </PopupWithForm>
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