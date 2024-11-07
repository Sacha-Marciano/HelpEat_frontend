import { useContext } from "react";

import { Link } from "react-router-dom";

import "./Navigation.css";

import toqueIcon from "../../images/Toque.png";
import helpEatLogo from "../../images/HelpEatLogo.svg";
import logoutIcon from "../../images/LogoutIcon.svg";
import searchIcon from "../../images/searchIcon.svg";
import addIcon from "../../images/AddIcon.svg";
import profileIcon from "../../images/ProfileIcon.svg";
import scheduleIcon from "../../images/ScheduleIcon.svg";

import { CurrentUserContext } from "../../contexts/currentUserContext";

function Navigation({
  isOpen,
  onClickSearch,
  onClickAddRecipe,
  onClickScheduleRecipe,
  onLogout,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className={`navigation ${isOpen ? "navigation_opened" : ""}`}>
      <nav className="navigation__container">
        <img
          className="navigation__logo"
          src={helpEatLogo}
          alt="HelpEat logo"
        />
        <Link to="/profile" className="navigation__link">
          <span className="navigation__username"> {currentUser.name}</span>
          <img
            className="navigation__avatar"
            src={toqueIcon}
            alt="Toque Icon"
          />
        </Link>
        <Link to="/profile" className="navigation__link-profile">
          <span className="navigation__button"> Profile</span>
          <img
            className="navigation__icon"
            src={profileIcon}
            alt="Profile icon"
          />
        </Link>

        <button
          className="navigation__button"
          type="button"
          onClick={onClickSearch}
        >
          Search a recipe
          <img
            className="navigation__icon"
            src={searchIcon}
            alt="Search icon"
          />
        </button>
        <button
          className="navigation__button"
          type="button"
          onClick={onClickAddRecipe}
        >
          Add a recipe
          <img className="navigation__icon" src={addIcon} alt="Add icon" />
        </button>
        <button
          className="navigation__button"
          type="button"
          onClick={onClickScheduleRecipe}
        >
          Schedule a recipe
          <img
            className="navigation__icon"
            src={scheduleIcon}
            alt="Schedule icon"
          />
        </button>
        <button className="navigation__button" type="button" onClick={onLogout}>
          Log out
          <img className="navigation__icon" src={logoutIcon} alt="LogoutIcon" />
        </button>
      </nav>
    </div>
  );
}

export default Navigation;
