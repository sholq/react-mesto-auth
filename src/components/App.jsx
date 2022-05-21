import {useState, useEffect} from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';

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
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from "./InfoTooltip";

import {api, authentication} from '../utils/Api';

function App() {
  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isTokenWasChecked, setIsTokenWasChecked] = useState(false)

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isSubmitPopupOpen, setIsSubmitPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [isFail, setIsFail] = useState(false);

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
          setIsFail(false);
          setIsInfoTooltipOpen(true);
          history.push("/sign-in");
          return res;
        } else {
          setIsFail(true);
          setIsInfoTooltipOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleTokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      return authentication.checkToken(token)
        .then(user => {
          setLoggedInUser(user.data)
          setLoggedIn(true);
          history.push("/");
        })
        .catch(err => {
          console.log(err);
        })
    }
    return Promise.resolve();
  }

  const handleLogin = (email, password) => {
    return authentication.login(email, password)
      .then(user => {
        if (user.token) {
          localStorage.setItem('token', user.token);
          setLoggedIn(true);
          handleTokenCheck();
          return user;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setLoggedInUser({});
    history.push("/sign-in");
  }

  useEffect(() => {
    let unmounted = false;
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch(err => {
        console.log(err);
      });
    handleTokenCheck()
      .finally(() => {
        !unmounted && setIsTokenWasChecked(true);
      })
    return () => unmounted = true;
  }, []);


  return (
    !isTokenWasChecked ? <div /> :
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedInUser={loggedInUser}
          signOut={handleSignOut}
        />
        <Switch>
          <Route path="/sign-up">
            <Register
              onRegister={handleRegister}
            />
          </Route>
          <Route path="/sign-in">
            <Login
              onLogin={handleLogin}
            />
          </Route>
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
        <InfoTooltip isFail={isFail} isOpen={isInfoTooltipOpen} onClose={closeAllPopup} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
