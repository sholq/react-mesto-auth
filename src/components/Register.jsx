import AuthPage from "./AuthPage";

function Register(props) {
  const {onRegister} = props;

  return (
    <AuthPage
      name="register"
      title="Регистрация"
      submitButtonText="Зарегистрироваться"
      onSubmit={onRegister}
    />
  )
}

export default Register;