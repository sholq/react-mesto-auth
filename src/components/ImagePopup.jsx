import Popup from "./Popup";

function ImagePopup(props) {
  const {isOpen, onClose, card} = props;

  return (
    <Popup isOpen={isOpen} onClose={onClose} isImage={true}>
      <figure className="popup__element-figure">
        <img className="popup__element-image" src={card.link} alt={card.name} />
        <figcaption className="popup__element-caption">{card.name}</figcaption>
      </figure>
    </Popup>
  )
}

export default ImagePopup;