import logoPath from '../image/Vector.svg';
import {Link, Route, Switch} from "react-router-dom";
import {useState} from "react";

function Header(props) {
  const {loggedInUser, signOut} = props;

  const [isBarOpen, setIsBarOpen] = useState(false);

  const handleButtonClick = () => {
    setIsBarOpen(!isBarOpen);
  }

  return (
    <Switch>
      <Route path="/sign-in">
        <header className="header">
          <img className="header__logo" src={logoPath} alt="Логотип Место" />
          <Link className="header__link" to="/sign-up">Регистрация</Link>
        </header>
      </Route>
      <Route path="/sign-up">
        <header className="header">
          <img className="header__logo" src={logoPath} alt="Логотип Место" />
          <Link className="header__link" to="/sign-in">Войти</Link>
        </header>
      </Route>
      <Route path="/">
        <header className="header">
          <div className={"header__container" + (isBarOpen ? " header__container_open" : "")}>
            <p className="header__current-user">{loggedInUser.email}</p>
            <Link className="header__link header__link_type_exit" to="/sign-in" onClick={signOut}>Выйти</Link>
          </div>
          <div className="header__wrap" >
            <img className="header__logo" src={logoPath} alt="Логотип Место" />
            <button className={"header__button" + (isBarOpen ? " header__button_icon_close" : "")} onClick={handleButtonClick} />
          </div>
        </header>
      </Route>
    </Switch>
  )
}

export default Header;