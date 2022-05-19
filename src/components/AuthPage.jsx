import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";

function AuthPage(props) {
    const {name, title, children, buttonText, onSubmit, isValid, isEmpty, isSignIn} = props;

    const history = useHistory();

    const onLinkClick = (evt) => {
      evt.preventDefault();
      history.push("./sign-up");
    }

    return (
      <section className="auth">
        <h2 className="auth__header">{title}</h2>
        <form className="auth__form" name={name} onSubmit={onSubmit}>
          {children}
          <button className={"auth__save-button" + (isEmpty || !isValid ? " auth__save-button_inactive" : "")} type="submit" disabled={isEmpty || !isValid}>{buttonText}</button>
        </form>
        {isSignIn && <a className="auth__link" href="./sing-up" onClick={withRouter(onLinkClick)}>Уже зарегистрированы? Войти</a>}
      </section>
    )
  }
  
  export default AuthPage;