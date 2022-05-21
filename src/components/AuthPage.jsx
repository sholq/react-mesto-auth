import { Link } from "react-router-dom";

function AuthPage(props) {
    const {name, title, children, buttonText, onSubmit, isSignIn} = props;

    return (
      <section className="auth">
        <h2 className="auth__header">{title}</h2>
        <form className="auth__form" name={name} onSubmit={onSubmit} noValidate={true}>
          {children}
          <button className={"auth__save-button"} type="submit">{buttonText}</button>
        </form>
        {isSignIn && <Link className="auth__link" to="/sign-up">Уже зарегистрированы? Войти</Link>}
      </section>
    )
  }
  
  export default AuthPage;