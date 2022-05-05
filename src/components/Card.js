import {useContext} from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const {_id} = useContext(CurrentUserContext);
  const {card, onCardClick} = props;

  const isOwn = card.owner._id === _id;
  const isLiked = card.likes.some(i => i._id === _id);

  const handleClick = () => {
    onCardClick(card);
  }

  return (
    <li className="element" id={card._id}>
      <img className="element__image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="element__container">
      <h2 className="element__caption">{card.name}</h2>
      <div>
          <button className={`element__like ${isLiked && 'element__like_active'}`} type="button" aria-label="Лайк"></button>
          <p className="element__counter">{card.likes.length}</p>
      </div>
      </div>
      {isOwn && <button className="element__delete" type="button" aria-label="Удалить"></button>}
    </li>
  );
}

export default Card;