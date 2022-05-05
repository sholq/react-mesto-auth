function PopupWithForm(props) {
    const {name, title, children, buttonText, isOpen, onClose, onSubmit} = props;

    return (
      <div className={`popup popup_type_${name}` + (isOpen && ' popup_opened')}>
        <div className="popup__container">
        <h2 className="popup__header">{title}</h2>
        <form className="popup__form" name={`${name}PopupForm`} onSubmit={onSubmit}>
          {children}
          <button className="popup__save-button" type="submit">{buttonText}</button>
        </form>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
        </div>
      </div>
    )
  }
    
  export default PopupWithForm;