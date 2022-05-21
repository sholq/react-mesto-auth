import { useState, useEffect, useRef } from "react";
import AuthPage from "./AuthPage";

function Login(props) {
  const {onLogin} = props;

  const email = useRef();
  const password = useRef();

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailValidationMessage, setEmailValidationMessage] = useState('');
  
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordValidationMessage, setPasswordValidationMessage] = useState('');
  
  const [buttonText, setButtonText] = useState('Войти');
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsEmailValid(email.current.validity.valid);
    setEmailValidationMessage(email.current.validationMessage);
    setIsPasswordValid(password.current.validity.valid);
    setPasswordValidationMessage(password.current.validationMessage);
    if (isEmailValid && isPasswordValid) {
      setButtonText(buttonText + '...');
      onLogin(email.current.value, password.current.value)
        .then(res => {
          if (res) {
            email.current.value = '';
            password.current.value = '';
          }
        })
        .finally(res => {
          setButtonText(buttonText);
          if (!res) {
            setEmailValidationMessage('Неверный адрес или пароль');
            setIsEmailValid(false);
            setIsPasswordValid(false);
          }
        });
    }
  }

  useEffect(() => {
    email.current.value = '';
    password.current.value = '';
    setEmailValidationMessage('');
    setPasswordValidationMessage('');
    setIsEmailValid(true);
    setIsPasswordValid(true);
  }, []);

  return (
    <AuthPage
      name="login"
      title="Вход"
      buttonText={buttonText}
      onSubmit={handleSubmit}
    >
      <label className="auth__field">
        <input ref={email} className={"auth__input" + (!isEmailValid ? " auth__input_invalid" : "")} type="text" name="email" placeholder="E-mail" autoComplete="off" minLength="2" maxLength="30" required />
        <span className="auth__input-error">{emailValidationMessage}</span>
      </label>
      <label className="auth__field">
        <input ref={password} className={"auth__input" + (!isPasswordValid ? " auth__input_invalid" : "")} type="password" name="password" placeholder="Пароль" autoComplete="off" minLength="6" maxLength="30" required />
        <span className="auth__input-error">{passwordValidationMessage}</span>
      </label>
    </ AuthPage>
  )
}

export default Login;