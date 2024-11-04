import { Link } from "react-router-dom";

import "./Header.css";

import helpEatLogo from "../../images/HelpEatLogo.svg";
import avatar from "../../images/Temp_Avatar.png";
import navigationIcon from "../../images/NavigationIcon.svg";

function Header({ onNavClick }) {
  return (
    <header className="header">
      <img
        className="header__navigation-icon"
        src={navigationIcon}
        alt="Navigation icon"
        onClick={onNavClick}
      />
      <Link to="/" className="header__link-main">
        <img className="header__logo" src={helpEatLogo} alt="HelpEat logo" />
      </Link>
      <Link to="/profile" className="header__link-profile">
        <span className="header__username"> User Name</span>
        <img className="header__avatar" src={avatar} />
      </Link>
    </header>
  );
}

export default Header;
