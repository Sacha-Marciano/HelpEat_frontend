import { useContext } from "react";
import { Link } from "react-router-dom";

import "./Header.css";

import helpEatLogo from "../../images/HelpEatLogo.svg";
import logoutIcon from "../../images/LogoutIcon.svg";
import navigationIcon from "../../images/NavigationIcon.svg";

import { CurrentUserContext } from "../../contexts/currentUserContext";

function Header({
  onNavClick,
  onLogout,
  onLoginClick,
  onSignupClick,
  isLoggedIn,
}) {
  const user = useContext(CurrentUserContext);

  return (
    <header className="header">
      {isLoggedIn ? (
        <img
          className="header__navigation-icon"
          src={navigationIcon}
          alt="Navigation icon"
          onClick={onNavClick}
        />
      ) : (
        ""
      )}
      <Link to="/" className="header__link-main">
        <img className="header__logo" src={helpEatLogo} alt="HelpEat logo" />
      </Link>
      {isLoggedIn ? (
        <div className="header__user-info">
          <Link to="/profile" className="header__link-profile">
            <span className="header__username"> {user.name}</span>
          </Link>
          <img
            className="header__logout"
            src={logoutIcon}
            alt="LogoutIcon"
            onClick={onLogout}
          />
        </div>
      ) : (
        <div className="header__user-actions">
          <button
            className="header__button"
            type="button"
            onClick={onLoginClick}
          >
            Log in
          </button>
          <button
            className="header__button"
            type="button"
            onClick={onSignupClick}
          >
            Sign up
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
