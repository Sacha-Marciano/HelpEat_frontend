import { Link } from "react-router-dom";

import "./Navigation.css";

import avatar from "../../images/Temp_Avatar.png";
import helpEatLogo from "../../images/HelpEatLogo.svg";

function Navigation({
  isOpen,
  onClickSearch,
  onClickAddRecipe,
  onClickScheduleRecipe,
}) {
  return (
    <div className={`navigation ${isOpen ? "navigation_opened" : ""}`}>
      <nav className="navigation__container">
        <img
          className="navigation__logo"
          src={helpEatLogo}
          alt="HelpEat logo"
        />
        <Link to="/profile" className="navigation__link">
          <span className="navigation__username"> User Name</span>
          <img className="navigation__avatar" src={avatar} alt="User avatar" />
        </Link>
        <Link to="/profile" className="navigation__link-profile">
          <span className="navigation__button"> Profile</span>
        </Link>

        <button
          className="navigation__button"
          type="button"
          onClick={onClickSearch}
        >
          Search a recipe
        </button>
        <button
          className="navigation__button"
          type="button"
          onClick={onClickAddRecipe}
        >
          Add a recipe
        </button>
        <button
          className="navigation__button"
          type="button"
          onClick={onClickScheduleRecipe}
        >
          Schedule a recipe
        </button>
      </nav>
    </div>
  );
}

export default Navigation;
