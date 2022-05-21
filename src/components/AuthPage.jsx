import {Link, Route, Switch} from "react-router-dom";
import {useEffect, useRef, useState} from "react";

function AuthPage(props) {
  const {name, title, submitButtonText, onSubmit} = props;

  const email = useRef();
  const password = useRef();

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailValidationMessage, setEmailValidationMessage] = useState('');

  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordValidationMessage, setPasswordValidationMessage] = useState('');

  const [buttonText, setButtonText] = useState(submitButtonText);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsEmailValid(email.current.validity.valid);
    setEmailValidationMessage(email.current.validationMessage);
    setIsPasswordValid(password.current.validity.valid);
    setPasswordValidationMessage(password.current.validationMessage);
    if (email.current.validity.valid && password.current.validity.valid) {
      setButtonText(buttonText + '...');
      onSubmit(email.current.value, password.current.value)
        .then(res => {
          if (res) {
            email.current.value = '';
            password.current.value = '';
          }
          if (!res) {
            setEmailValidationMessage('Что-то пошло не так');
            setIsEmailValid(false);
            setIsPasswordValid(false);
          }
        })
        .finally(() => {
          setButtonText(buttonText);
        });
    }
  }

  useEffect(() => {
    email.current.value = null;
    password.current.value = null;
    setEmailValidationMessage('');
    setPasswordValidationMessage('');
    setIsEmailValid(true);
    setIsPasswordValid(true);
  }, []);

  return (
    <section className="auth">
      <h2 className="auth__header">{title}</h2>
      <form className="auth__form" name={name} onSubmit={handleSubmit} noValidate={true}>
        <label className="auth__field">
          <input ref={email} className={"auth__input" + (!isEmailValid ? " auth__input_invalid" : "")} type="text" name="email" placeholder="E-mail" autoComplete="off" minLength="2" maxLength="30" required />
          <span className="auth__input-error">{emailValidationMessage}</span>
        </label>
        <label className="auth__field">
          <input ref={password} className={"auth__input" + (!isPasswordValid ? " auth__input_invalid" : "")} type="password" name="password" placeholder="Пароль" autoComplete="off" minLength="6" maxLength="30" required />
          <span className="auth__input-error">{passwordValidationMessage}</span>
        </label>
        <button className="auth__save-button" type="submit">{buttonText}</button>
      </form>
      <Switch>
        <Route path="/sign-in">
          <Link className="auth__link" to="/sign-up">Уже зарегистрированы? Войти</Link>
        </Route>
      </Switch>
    </section>
  )
}

export default AuthPage;