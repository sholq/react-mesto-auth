import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from '../utils/Api';
import Card from "./Card";

function Main(props) {
  const {name, about, avatar, _id} = useContext(CurrentUserContext);
  const {onEditAvatar, onEditProfile, onAddPlace, onCardClick} = props;
  
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getInitialCards()
      .then(cards => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === _id);

    ((isLiked) ? api.deleteLike(card._id) : api.putLike(card._id))
      .then(newCard => {
        setCards(state => state.map(currentCard => currentCard._id === card._id ? newCard : currentCard));
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(state => state.filter(currentCard => !(currentCard._id === card._id)));
      });
  }

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__edit-wrap" onClick={onEditAvatar}>
            <img className="profile__avatar" src={avatar} alt={name} />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{name}</h1>
            <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={onEditProfile}></button>
            <p className="profile__description">{about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              card={card}
              onCardClick={onCardClick}
              onChangeLike={handleCardLike}
              onDeletecard={handleCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}
  
export default Main;