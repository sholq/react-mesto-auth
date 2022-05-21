import {useEffect, useCallback} from 'react';

function Popup(props) {
    const {children, isOpen, onClose, isImage} = props;  

    const handleOverlayClosing = (evt) => {
      if (evt.target.classList.contains('popup')) {
        onClose();
      }
    }

    const handleEscClose = useCallback((evt) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    }, [onClose])
  
    useEffect(() => {  
      if (isOpen) {
        document.addEventListener('keydown', handleEscClose)
      } 
      
      return () => {
        document.removeEventListener('keydown', handleEscClose);
      }
    }, [isOpen, handleEscClose])

    return (
      <div className={"popup" + (isOpen ? " popup_opened" : "")} onClick={handleOverlayClosing}>
        <div className={"popup__container" + (isImage ? " popup__container_type_element" : "")}>
          {children}
          <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose} />
        </div>
      </div> 
    )
  }
  
  export default Popup;