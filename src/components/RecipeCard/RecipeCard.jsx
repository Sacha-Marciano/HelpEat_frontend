import "./RecipeCard.css";

import { baseURL } from "../../utils/mainApi";

function RecipeCard({
  isWholeCard,
  isInProfile,
  recipe,
  onClick,
  onDeleteFavorite,
}) {
  const backgroundImage = {
    backgroundImage: `url(${baseURL}${recipe.imageUrl})`,
  };

  const handleClick = () => {
    onClick(recipe);
  };

  const handleDeleteCard = (evt) => {
    evt.stopPropagation();
    onDeleteFavorite({ recipeId: recipe._id });
  };

  return isWholeCard ? (
    <div className="recipe-card" style={backgroundImage} onClick={handleClick}>
      <h2 className="recipe-card__title">{recipe.name}</h2>
      {isInProfile ? (
        <button
          className="recipe-card__delete-favorite"
          type="button"
          onClick={handleDeleteCard}
        >
          Remove favorite
        </button>
      ) : (
        ""
      )}
    </div>
  ) : (
    <div className="recipe-card_type_name-only">
      <h2 className="recipe-card__title-only" onClick={handleClick}>
        {recipe.name}
      </h2>
    </div>
  );
}

export default RecipeCard;
