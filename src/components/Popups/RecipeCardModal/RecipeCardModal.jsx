import "./RecipeCardModal.css";

function RecipeCardModal({ isOpen, onClose, onAddFavorite, selectedCard }) {
  const handleAddFavorite = () => {
    onAddFavorite({
      _id: `${Math.random()}`,
      name: selectedCard.name,
      image: selectedCard.image,
      ingredients: selectedCard.ingredients,
      steps: selectedCard.steps,
    });
  };

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
                return <li key={index}>{item}</li>;
              })}
            </ul>
            <p className="modal__recipe-subtitle">Steps :</p>
            <ul className="modal__recipe-steps">
              {selectedCard.steps.map((item, index) => {
                return <li key={index}>{item}</li>;
              })}
            </ul>
          </div>
          <button
            className="modal__button-favorite"
            type="button"
            onClick={handleAddFavorite}
          >
            Add to favorites
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCardModal;
