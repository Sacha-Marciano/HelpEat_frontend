import "./RecipeCardModal.css";

function RecipeCardModal({
  isOpen,
  onClose,
  onAddFavorite,
  selectedCard,
  favoriteRecipes,
}) {
  const handleAddFavorite = () => {
    onAddFavorite({
      _id: selectedCard._id,
      name: selectedCard.name,
      image: selectedCard.image,
      ingredients: selectedCard.ingredients,
      measures: selectedCard.measures,
      steps: selectedCard.steps,
    });
  };

  const isFavorite =
    favoriteRecipes.filter((item) => item._id == selectedCard._id).length > 0;

  const buttonSubmitClassName = `modal__button-favorite ${
    isFavorite ? "modal__button-favorite_disabled" : ""
  }`;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container">
        <button
          className="modal__button_type_close"
          type="button"
          onClick={onClose}
        />
        <img
          className="modal__image"
          src={selectedCard.image}
          alt="Recipe image"
        />
        <div className="modal__recipe-info">
          <h2 className="modal__recipe-title">{selectedCard.name}</h2>
          <div className="modal__recipe">
            <p className="modal__recipe-subtitle">Ingredients :</p>

            <ul className="modal__recipe-ingredients">
              {selectedCard.ingredients.map((item, index) => {
                return (
                  <li key={index} className="modal__recipe-ingredient">
                    {selectedCard.measures[index]} {item}
                  </li>
                );
              })}
            </ul>
            <p className="modal__recipe-subtitle">Steps :</p>
            <ul className="modal__recipe-steps">
              {selectedCard.steps.map((item, index) => {
                return (
                  <li key={index} className="modal__recipe-step">
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
          <button
            className={buttonSubmitClassName}
            type="button"
            onClick={handleAddFavorite}
            disabled={isFavorite}
          >
            {isFavorite ? "Favorite recipe !" : "Add to favorite"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCardModal;
