import "./RecipeCard.css";

function RecipeCard({
  isWholeCard,
  card,
  setSelectedCard,
  onClick,
  handleDeleteCard,
}) {
  const backgroundImage = {
    backgroundImage: `url(${card.image})`,
  };

  const handleClick = () => {
    setSelectedCard(card);
    onClick();
  };

  //   const handleDelete = (evt) => {
  //     This function will be implemented during the back-end integration
  //     Markup and styles are ready
  //   };

  return isWholeCard ? (
    <div className="recipe-card" style={backgroundImage} onClick={handleClick}>
      <h2 className="recipe-card__title">{card.name}</h2>
    </div>
  ) : (
    <div className="recipe-card_type_name-only">
      <h2 className="recipe-card__title-only" onClick={handleClick}>
        {card.name}
      </h2>
      {/* <button
        className="recipe-card__delete-schedule"
        type="button"
        onClick={handleDelete}
      /> */}
    </div>
  );
}

export default RecipeCard;
