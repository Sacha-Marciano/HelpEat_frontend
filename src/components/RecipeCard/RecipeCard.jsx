import "./RecipeCard.css";

function RecipeCard({
  isWholeCard,
  isInProfile,
  card,
  onClick,
  handleDeleteFavorite,
}) {
  const backgroundImage = {
    backgroundImage: `url(${card.image})`,
  };

  const handleClick = () => {
    onClick(card);
  };

  const handleDeleteCard = (evt) => {
    evt.stopPropagation();
    handleDeleteFavorite(card);
  };

  return isWholeCard ? (
    <div className="recipe-card" style={backgroundImage} onClick={handleClick}>
      <h2 className="recipe-card__title">{card.name}</h2>
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
        {card.name}
      </h2>
    </div>
  );
}

export default RecipeCard;
