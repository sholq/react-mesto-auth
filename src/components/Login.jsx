function Login() {
  return (
    <section className="login">
      <h2 className="login__header">Регистрация</h2>
      <form className="login__form" name={`LoginForm`} onSubmit={null}>
        <label className="login__field">
          <input ref={null} className={"login__input" + (!true ? " login__input_invalid" : "")} type="text" name="e-mail" placeholder="E-mail" autoComplete="off" minLength="2" maxLength="30" required onChange={null}/>
          <span className="login__input-error"></span>
        </label>
        <label className="login__field">
            <input ref={null} className={"login__input" + (!true ? " login__input_invalid" : "")} type="password" name="password" placeholder="Пароль" autoComplete="off" required onChange={null}/>
            <span className="login__input-error"></span>
        </label>
        <button className={"login__save-button" + (false || !true ? " login__save-button_inactive" : "")} type="submit" disabled={false || !true}>Зарегистрироваться</button>
      </form>
      <a className="login__link" href="./sing-up">Уже зарегистрированы? Войти</a>
    </section>
  )
}

export default Login;