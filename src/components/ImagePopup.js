function ImagePopup(props) {
  const {isOpen, onClose, card} = props;

  return (
    <div className={"popup popup_type_element" + (isOpen && ' popup_opened')}>
      <div className="popup__container popup__container_type_element">
        <figure className="popup__element-figure">
          <img className="popup__element-image" src={card.link} alt={card.name} />
          <figcaption className="popup__element-caption">{card.name}</figcaption>
        </figure>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
      </div>
    </div> 
  )
}

export default ImagePopup;