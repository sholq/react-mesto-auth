function Main() {
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__edit-wrap">
            <img className="profile__avatar" src="https://www.icachef.co.za/wp-content/uploads/2019/01/ICA_Profile-Place-Holder.png" alt="" />
          </div>
          <div className="profile__info">
            <h1 className="profile__name"></h1>
            <button className="profile__edit-button" type="button" aria-label="Редактировать"></button>
            <p className="profile__description"></p>
          </div>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить"></button>
      </section>

      <section className="elements">
        <ul className="elements__list"></ul>
      </section>
    </main>
  )
}
  
export default Main;