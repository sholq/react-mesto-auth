import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function SubmitPopup(props) {
  const {isOpen, onClose, onSubmit} = props;

  const [buttonText, setButtonText] = useState('Да');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setButtonText(buttonText + '...');
    onSubmit()
      .finally(() => {
        setButtonText(buttonText);
      });
  }

  return (
    <PopupWithForm
      title='Вы уверены?'
      name='confirm'
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={true}
      isEmpty={false}
    />
  )
}

export default SubmitPopup