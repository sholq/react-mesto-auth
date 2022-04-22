function PopupWithForm(props) {
    return (
      <div className={`popup popup_type_${props.name}` + (props.isOpen && ' popup_opened')}>
        <div className="popup__container">
        <h2 className="popup__header">{props.title}</h2>
        <form className="popup__form" name={`${props.name}PopupForm`}>
          {props.children}
          <button className="popup__save-button" type="submit">{props.buttonText}</button>
        </form>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
        </div>
      </div>
    )
  }
    
  export default PopupWithForm;