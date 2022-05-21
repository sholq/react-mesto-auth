import { useState, useEffect, useRef } from "react";
import AuthPage from "./AuthPage";

function Register(props) {
  const {onRegister} = props;

  const email = useRef();
  const password = useRef();

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailValidationMessage, setEmailValidationMessage] = useState('');
  
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordValidationMessage, setPasswordValidationMessage] = useState('');
  
  const [buttonText, setButtonText] = useState('Зарегистрироваться');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsEmailValid(email.current.validity.valid);
    setEmailValidationMessage(email.current.validationMessage);
    setIsPasswordValid(password.current.validity.valid);
    setPasswordValidationMessage(password.current.validationMessage);
    if (isEmailValid && isPasswordValid) {
      setButtonText(buttonText + '...');
      onRegister(email.current.value, password.current.value)
        .then(res => {
          if (res) {
            email.current.value = '';
            password.current.value = '';
          }
        })
        .finally(res => {
          setButtonText(buttonText);
          if (!res) {
            setEmailValidationMessage('Проверьте формат e-mail: example@example.com');
            setIsEmailValid(false);
            setIsPasswordValid(false);
          }
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
    <AuthPage
      name="Register"
      title="Регистрация"
      buttonText={buttonText}
      onSubmit={handleSubmit}
      isSignIn={true}
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

export default Register;