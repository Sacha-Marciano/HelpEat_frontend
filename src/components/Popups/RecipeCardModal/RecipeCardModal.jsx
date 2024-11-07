import { useContext } from "react";

import "./RecipeCardModal.css";

import { CurrentUserContext } from "../../../contexts/currentUserContext";

function RecipeCardModal({
  isOpen,
  onClose,
  onAddFavorite,
  onRecipeDelete,
  selectedCard,
}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwner = currentUser._id === selectedCard.owner;

  const buttonSubmitClassName = `modal__button-favorite ${
    selectedCard.isFavorite ? "modal__button-favorite_disabled" : ""
  }`;

  const handleRecipeDelete = () => {
    onRecipeDelete({ recipeId: selectedCard._id });
  };

  const handleAddFavorite = () => {
    onAddFavorite({ recipeId: selectedCard._id });
  };

  return (
    <div
      className={`modal__recipe-card ${
        isOpen ? "modal__recipe-card_opened" : ""
      }`}
    >
      <div className="modal__container_type_card">
        <button
          className="modal__button-close"
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
          <div className="modal__owner-section">
            {isOwner ? (
              <button
                className="modal__delete-button"
                type="button"
                onClick={handleRecipeDelete}
              >
                Delete recipe
              </button>
            ) : (
              <p className="modal__owner-name">by Owner</p>
            )}
          </div>
          <div className="modal__recipe">
            <p className="modal__recipe-subtitle">Ingredients :</p>

            <ul className="modal__recipe-ingredients">
              {selectedCard.ingredients
                ? selectedCard.ingredients.map((item, index) => {
                    return item != "" ? (
                      <li key={index} className="modal__recipe-ingredient">
                        {selectedCard.measures[index]} {item}
                      </li>
                    ) : (
                      ""
                    );
                  })
                : ""}
            </ul>
            <p className="modal__recipe-subtitle">Steps :</p>
            <ul className="modal__recipe-steps">
              {selectedCard.instructions
                ? selectedCard.instructions.map((item, index) => {
                    return item != "" ? (
                      <li key={index} className="modal__recipe-step">
                        {item}
                      </li>
                    ) : (
                      ""
                    );
                  })
                : ""}
            </ul>
            <button
              className={buttonSubmitClassName}
              type="button"
              onClick={handleAddFavorite}
              disabled={selectedCard.isFavorite}
            >
              {selectedCard.isFavorite
                ? "Favorite recipe !"
                : "Add to favorite"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCardModal;
