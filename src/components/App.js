import '../App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function App() {
  return (
    <div className="page">
      <Header />
      <Main />
      <Footer />

      <div className="popup popup_type_edit">
        <div className="popup__container">
          <h2 className="popup__header">Редактировать профиль</h2>
          <form className="popup__form" name="editPopupForm">
            <label className="popup__field">
              <input className="popup__input popup__input_type_name" type="text" name="name" value="" autocomplete="off" id="edit-popup-name-input" minlength="2" maxlength="40" required />
              <span className="popup__input-error edit-popup-name-input-error"></span>
            </label>
            <label className="popup__field">
              <input className="popup__input popup__input_type_description" type="text" name="about" value="" autocomplete="off" id="edit-popup-description-input"  minlength="2" maxlength="200" required />
              <span className="popup__input-error edit-popup-description-input-error"></span>
            </label>
            <button className="popup__save-button" type="submit">Сохранить</button>
          </form>
          <button className="popup__close-button" type="button" aria-label="Закрыть"></button>
        </div>
      </div>

      <div className="popup popup_type_add">
        <div className="popup__container">
          <h2 className="popup__header">Новое место</h2>
          <form className="popup__form" name="addPopupForm">
            <label className="popup__field">
              <input className="popup__input popup__input_type_name" type="text" name="name" placeholder="Название" autocomplete="off" id="add-popup-name-input" minlength="2" maxlength="30" required />
              <span className="popup__input-error add-popup-name-input-error"></span>
            </label>
            <label className="popup__field">
              <input className="popup__input popup__input_type_link" type="url" name="link" placeholder="Ссылка на картинку" autocomplete="off" id="add-popup-link-input" required />
              <span className="popup__input-error add-popup-link-input-error"></span>
            </label>
            <button className="popup__save-button" type="submit">Создать</button>
          </form>
          <button className="popup__close-button" type="button" aria-label="Закрыть"></button>
        </div>
      </div>

      <div className="popup popup_type_element">
        <div className="popup__container popup__container_type_element">
          <figure className="popup__element-figure">
            <img className="popup__element-image" src="https://images.unsplash.com/photo-1530362502708-d02c8f093039?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="" />
            <figcaption className="popup__element-caption"></figcaption>
          </figure>
          <button className="popup__close-button" type="button" aria-label="Закрыть"></button>
        </div>
      </div>

      <div className="popup popup_type_confirm">
        <div className="popup__container">
          <h2 className="popup__header popup__header_type_confirm">Вы уверены?</h2>
          <button className="popup__save-button popup__save-button_type_confirm">Да</button>
          <button className="popup__close-button" type="button" aria-label="Закрыть"></button>
        </div>
      </div>

      <div className="popup popup_type_avatar">
        <div className="popup__container">
          <h2 className="popup__header">Обновить аватар</h2>
          <form className="popup__form" name="editAvatarPopupForm">
            <label className="popup__field">
              <input className="popup__input popup__input_type_link" type="url" name="avatar" placeholder="Ссылка на картинку" autocomplete="off" id="edit-avatar-popup-link-input" required />
              <span className="popup__input-error edit-avatar-popup-link-input-error"></span>
            </label>
            <button className="popup__save-button" type="submit">Сохранить</button>
          </form>
          <button className="popup__close-button" type="button" aria-label="Закрыть"></button>
        </div>
      </div>
    </div>
  );
}

export default App;
