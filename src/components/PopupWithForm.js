function PopupWithForm(props) {
    return (
      <div className={`popup popup_type_${props.name}`}>
        <div className="popup__container">
        <h2 className="popup__header">{props.title}</h2>
        <form className="popup__form" name={`${props.name}PopupForm`}>
          {props.children}
        </form>
        <button className="popup__close-button" type="button" aria-label="Закрыть"></button>
        </div>
      </div>
    )
  }
    
  export default PopupWithForm;