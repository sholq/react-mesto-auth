import AuthPage from "./AuthPage";

function Login(props) {
  const {onLogin} = props;

  return (
    <AuthPage
      name="login"
      title="Вход"
      submitButtonText="Войти"
      onSubmit={onLogin}
    />
  )
}

export default Login;