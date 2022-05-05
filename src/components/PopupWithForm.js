import { useEffect, useRef, useState } from 'react';

function PopupWithForm(props) {
    const {name, title, children, buttonText, isOpen, onClose, onSubmit, isValid, isEmpty} = props;

    const button = useRef();

    const [isInactive, setIsInactive] = useState(isEmpty || !isValid);

    const handleSubmit= (evt) => {
      button.current.textContent += '...';
      onSubmit(evt)
        .finally(() => {
          button.current.textContent = buttonText;
        });
    }

    useEffect(() => {
      setIsInactive(isEmpty || !isValid);
      (isInactive) ? button.current.setAttribute("disabled", "disabled") : button.current.removeAttribute("disabled");
    }, [isValid, isEmpty, isInactive])

    return (
      <div className={`popup popup_type_${name}` + (isOpen ? " popup_opened" : "")}>
        <div className="popup__container">
        <h2 className="popup__header">{title}</h2>
        <form className="popup__form" name={`${name}PopupForm`} onSubmit={handleSubmit}>
          {children}
          <button ref={button} className={"popup__save-button" + (isInactive ? " popup__save-button_inactive" : "")} type="submit">{buttonText}</button>
        </form>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
        </div>
      </div>
    )
  }
    
  export default PopupWithForm;