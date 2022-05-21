import { useState, useEffect, useRef } from "react";
import AuthPage from "./AuthPage";

function Register(props) {
  const {onRegister} = props;

  const email = useRef();
  const password = useRef();

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [emailValidationMessage, setEmailValidationMessage] = useState('');
  
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [passwordValidationMessage, setPasswordValidationMessage] = useState('');
  
  const [buttonText, setButtonText] = useState('Зарегистрироваться');

  const handleEmailChange = (evt) => {
    setIsEmailValid(evt.target.validity.valid);
    setEmailValidationMessage(evt.target.validationMessage);
    (evt.target.value === '') ? setIsEmailEmpty(true) : setIsEmailEmpty(false);
  }

  const handlePasswordChange = (evt) => {
    setIsPasswordValid(evt.target.validity.valid);
    setPasswordValidationMessage(evt.target.validationMessage);
    (evt.target.value === '') ? setIsPasswordEmpty(true) : setIsPasswordEmpty(false);
  }
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setButtonText(buttonText + '...');
    onRegister(email.current.value, password.current.value)
      .then(res => {
        if (res) {
          email.current.value = '';
          password.current.value = '';
        }
      })
      .finally(() => {
        setButtonText(buttonText);
      });
  }

  useEffect(() => {
    email.current.value = null;
    password.current.value = null;
    setEmailValidationMessage('');
    setPasswordValidationMessage('');
    setIsEmailValid(true);
    setIsEmailEmpty(true);
    setIsPasswordValid(true);
    setIsPasswordEmpty(true);
  }, []);

  return (
    <AuthPage
      name="Register"
      title="Регистрация"
      buttonText={buttonText}
      isValid={isEmailValid && isPasswordValid}
      isEmpty={isEmailEmpty || isPasswordEmpty}
      onSubmit={handleSubmit}
      isSignIn={true}
    >
      <label className="auth__field">
        <input ref={email} className={"auth__input" + (!isEmailValid ? " auth__input_invalid" : "")} type="text" name="email" placeholder="E-mail" autoComplete="off" minLength="2" maxLength="30" required onChange={handleEmailChange}/>
        <span className="auth__input-error">{emailValidationMessage}</span>
      </label>
      <label className="auth__field">
        <input ref={password} className={"auth__input" + (!isPasswordValid ? " auth__input_invalid" : "")} type="password" name="password" placeholder="Пароль" autoComplete="off" minLength="6" maxLength="30" required onChange={handlePasswordChange}/>
        <span className="auth__input-error">{passwordValidationMessage}</span>
      </label>
    </ AuthPage>
  )
}

export default Register;