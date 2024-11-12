import { Link } from "react-router-dom";

import "./Navigation.css";

import logoutIcon from "../../images/LogoutIcon.svg";
import searchIcon from "../../images/searchIcon.svg";
import addIcon from "../../images/AddIcon.svg";
import profileIcon from "../../images/ProfileIcon.svg";
import scheduleIcon from "../../images/ScheduleIcon.svg";

function MobileNav({
  onClickSearch,
  onClickAddRecipe,
  onClickScheduleRecipe,
  onLogout,
}) {
  return (
    <nav className="navigation_mobile">
      <img
        className="navigation__icon_mobile"
        src={logoutIcon}
        alt="LogoutIcon"
        onClick={onLogout}
      />
      <img
        className="navigation__icon_mobile"
        src={searchIcon}
        alt="Search icon"
        onClick={onClickSearch}
      />
      <img
        className="navigation__icon_mobile"
        src={addIcon}
        alt="Add icon"
        onClick={onClickAddRecipe}
      />
      <img
        className="navigation__icon_mobile"
        src={scheduleIcon}
        alt="Schedule icon"
        onClick={onClickScheduleRecipe}
      />
      <Link to="/profile" className="navigation__link_mobile">
        <img
          className="navigation__icon_mobile"
          src={profileIcon}
          alt="Profile icon"
        />
      </Link>
    </nav>
  );
}

export default MobileNav;
