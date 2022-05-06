import Popup from "./Popup";

function PopupWithForm(props) {
    const {name, title, children, buttonText, isOpen, onClose, onSubmit, isValid, isEmpty} = props;

    return (
      <Popup isOpen={isOpen} onClose={onClose}>
        <h2 className="popup__header">{title}</h2>
        <form className="popup__form" name={`${name}PopupForm`} onSubmit={onSubmit}>
          {children}
          <button className={"popup__save-button" + (isEmpty || !isValid ? " popup__save-button_inactive" : "")} type="submit" disabled={isEmpty || !isValid}>{buttonText}</button>
        </form>
      </Popup>
    )
  }
    
  export default PopupWithForm;