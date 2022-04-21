function Card(props) {
  return (
    <li className="element" id={props.card._id}>
      <img className="element__image" src={props.card.link} alt={props.card.name} />
      <div className="element__container">
      <h2 className="element__caption">{props.card.name}</h2>
      <div>
          <button className="element__like" type="button" aria-label="Лайк"></button>
          <p className="element__counter">{props.card.likes.length}</p>
      </div>
      </div>
      <button className="element__delete" type="button" aria-label="Удалить"></button>
    </li>
  );
}

export default Card;