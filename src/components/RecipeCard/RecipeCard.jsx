import "./RecipeCard.css";

function RecipeCard({ isWholeCard, card, setSelectedCard, onClick }) {
  const backgroundImage = {
    backgroundImage: `url(${card.image})`,
  };

  const handleClick = () => {
    setSelectedCard(card);
    onClick();
  };

  return isWholeCard ? (
    <div className="recipe-card" style={backgroundImage} onClick={handleClick}>
      <h2 className="recipe-card__title">{card.name}</h2>
    </div>
  ) : (
    <div className="recipe-card_type_name-only" onClick={handleClick}>
      <h2 className="recipe-card__title-only">{card.name}</h2>
    </div>
  );
}

export default RecipeCard;
