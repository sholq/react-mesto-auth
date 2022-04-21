function ImagePopup(props) {
  return (
    <div className={"popup popup_type_element" + (props.isOpen && ' popup_opened')}>
      <div className="popup__container popup__container_type_element">
        <figure className="popup__element-figure">
          <img className="popup__element-image" src={props.card.link} alt={props.card.name} />
          <figcaption className="popup__element-caption">{props.card.name}</figcaption>
        </figure>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
      </div>
    </div> 
  )
}

export default ImagePopup;