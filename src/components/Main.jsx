import { useContext } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main(props) {
  const {name, about, avatar} = useContext(CurrentUserContext);
  const {onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards} = props;

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__edit-wrap" onClick={onEditAvatar}>
            <img className="profile__avatar" src={avatar} alt={name} />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{name}</h1>
            <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={onEditProfile} />
            <p className="profile__description">{about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить" onClick={onAddPlace} />
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onChangeLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}
  
export default Main;