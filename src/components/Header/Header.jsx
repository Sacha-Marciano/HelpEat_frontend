import { Link } from "react-router-dom";

import "./Header.css";

import searchIcon from "../../assets/SearchIcon.svg";
import helpEatLogo from "../../assets/HelpEatLogo.svg";
import avatar from "../../assets/Temp_Avatar.png";

function Header() {
  return (
    <header className="header">
      <img className="header__search-icon" src={searchIcon} alt="Search icon" />
      <button className="header__add-button">+ Add a recipe</button>
      <Link to="/" className="header__link">
        <img className="header__logo" src={helpEatLogo} alt="HelpEat logo" />
      </Link>
      <Link to="/profile" className="header__link">
        <span className="header__username"> User Name</span>
        <img className="header__avatar" src={avatar} />
      </Link>
    </header>
  );
}

export default Header;
