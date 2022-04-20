function ImagePopup() {
  return (
    <div className="popup popup_type_element">
      <div className="popup__container popup__container_type_element">
        <figure className="popup__element-figure">
          <img className="popup__element-image" src="https://images.unsplash.com/photo-1530362502708-d02c8f093039?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="" />
          <figcaption className="popup__element-caption"></figcaption>
        </figure>
        <button className="popup__close-button" type="button" aria-label="Закрыть"></button>
      </div>
    </div> 
  )
}

export default ImagePopup;