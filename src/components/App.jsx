import {useState, useEffect} from 'react';
import {Switch, useHistory} from 'react-router-dom';
import '../App.css';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import SubmitPopup from './SubmitPopup';
import api from '../utils/Api';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from "./InfoTooltip";
import authentication from "../utils/Auth"

function App() {
  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isSubmitPopupOpen, setIsSubmitPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [isError, setIsError] = useState(false);

  const [loginedUser, setLoginedUser] = useState({});

  const history = useHistory();

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleCardDelete = (card) => {
    setSelectedCard(card);
    setIsSubmitPopupOpen(true);
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
    setIsInfoTooltipOpen(false);
  }

  const handleUpdateUser = (info) => {
    return api.editUserInfo(info)
      .then((info) => {
        setCurrentUser(info);
        closeAllPopup();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleUpdateAvatar = (avatar) => {
    return api.editUserAvatar(avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopup();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    return ((isLiked) ? api.deleteLike(card._id) : api.putLike(card._id))
      .then(newCard => {
        setCards(state => state.map(currentCard => currentCard._id === card._id ? newCard : currentCard));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleAddPlace = (date) => {
    return api.addNewImage(date)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopup();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleCardDeleteSubmit = () => {
    return api.deleteCard(selectedCard._id)
      .then(() => {
        setCards(state => state.filter(currentCard => !(currentCard._id === selectedCard._id)));
        setIsSubmitPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleRegister = (email, password) => {
    return authentication.register(email, password)
      .then(res => {
        if (res) {
          setIsError(false);
          setIsInfoTooltipOpen(true);
          history.push("/sign-in");
          return res;
        } else {
          setIsError(true);
          setIsInfoTooltipOpen(true);
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleTokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      authentication.checkToken(token)
        .then((user) => {
          setLoginedUser(user.data)
          setLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }    
  }

  const handleLogin = (email, password) => {
    return authentication.login(email, password)
      .then(user => {
        if (user.token) {
          localStorage.setItem('token', user.token);
          setLoggedIn(true);
          handleTokenCheck();
          history.push("/");
          return user;
        } else {
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setLoginedUser({});
    history.push("/sign-in");
  }

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
      handleTokenCheck();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loginedUser={loginedUser}
          signOut={handleSignOut}
        />
        <Switch>
          <ProtectedRoute path="/sign-up" loggedIn={!loggedIn} component={Register} redirectTo="./"
            onRegister={handleRegister}
          />
          <ProtectedRoute path="/sign-in" loggedIn={!loggedIn} component={Login} redirectTo="./"
            onLogin={handleLogin}
          />
          <ProtectedRoute loggedIn={loggedIn} component={Main} redirectTo="./sign-in"
            cards={cards}
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </Switch>
        {loggedIn && <Footer />}
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopup} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopup} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopup} onAddPlace={handleAddPlace} />
        <SubmitPopup isOpen={isSubmitPopupOpen} onClose={closeAllPopup} onSubmit={handleCardDeleteSubmit} />
        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopup} />
        <InfoTooltip isError={isError} isOpen={isInfoTooltipOpen} onClose={closeAllPopup} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;