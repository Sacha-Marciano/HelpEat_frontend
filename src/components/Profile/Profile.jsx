import "./Profile.css";

import RecipeCard from "../RecipeCard/RecipeCard";

function Profile({ favoriteList, onRecipeCardClick, onDeleteFavorite }) {
  return (
    <div className="profile">
      <div className="profile__section">
        <h2 className="profile__title">Grocery List</h2>
        <ul className="profile__grocery-list"></ul>
      </div>
      <div className="profile__section">
        <h2 className="profile__title">Favorite Recipes</h2>
        <ul className="profile__favorites">
          {favoriteList.map((item) => {
            return (
              <li key={item._id} className="profile__recipe-card">
                <RecipeCard
                  isWholeCard={true}
                  isInProfile={true}
                  recipe={item}
                  onClick={onRecipeCardClick}
                  onDeleteFavorite={onDeleteFavorite}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
