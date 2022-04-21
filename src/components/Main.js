function Main(props) {

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__edit-wrap" onClick={props.onEditAvatar}>
            <img className="profile__avatar" src={props.userAvatar} alt={props.userName} />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{props.userName}</h1>
            <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={props.onEditProfile}></button>
            <p className="profile__description">{props.userDescription}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {props.cards.map((card) => (
            <li className="element" id={card._id}>
              <img className="element__image" src={card.link} alt={card.name} />
              <div className="element__container">
                <h2 className="element__caption">{card.name}</h2>
                <div>
                  <button className="element__like" type="button" aria-label="Лайк"></button>
                  <p className="element__counter">{card.likes.length}</p>
                </div>
              </div>
              <button className="element__delete" type="button" aria-label="Удалить"></button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
  
export default Main;