import logoPath from '../image/Vector.svg';
import {Link, Route, Switch} from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип Место" />
      <Switch>
        <Route path="/sign-in">
          <Link className="header__link" to="/sign-up">Войти</Link>
        </Route>
        <Route path="/sign-up">
          <Link className="header__link" to="/sign-in">Регистрация</Link>
        </Route>
        <Route path="/">
          <div className="header__constainer">
            <p className="header__current-user">mail@mail.com</p>
            <Link className="header__link" to="/sign-in">Выход</Link>
          </div>
        </Route>
      </Switch>
    </header>
  )
}

export default Header;