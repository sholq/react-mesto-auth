function Main() {
  const handleEditAvatarClick = () => {
    const popup = document.querySelector('.popup_type_avatar');
    popup.classList.add('popup_opened');
  }
  
  const handleEditProfileClick = () => {
    const popup = document.querySelector('.popup_type_edit');
    popup.classList.add('popup_opened');
  }

  const handleAddPlaceClick = () => {
    const popup = document.querySelector('.popup_type_add');
    popup.classList.add('popup_opened');
  }

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__edit-wrap" onClick={handleEditAvatarClick}>
            <img className="profile__avatar" src="https://www.icachef.co.za/wp-content/uploads/2019/01/ICA_Profile-Place-Holder.png" alt=""/>
          </div>
          <div className="profile__info">
            <h1 className="profile__name"></h1>
            <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={handleEditProfileClick}></button>
            <p className="profile__description"></p>
          </div>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить" onClick={handleAddPlaceClick}></button>
      </section>

      <section className="elements">
        <ul className="elements__list"></ul>
      </section>
    </main>
  )
}
  
export default Main;