import "./AddRecipeModal.css";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddRecipeModal({ isOpen, onClose }) {
  const _handleSubmit = (evt) => {
    evt.preventDefault();
  };
  return (
    <ModalWithForm
      title="Add Recipe"
      closePopup={onClose}
      isOpen={isOpen}
      onSubmit={_handleSubmit}
      buttonText="Save"
    >
      <label className="modal__label">
        Name of the recipe*
        <input
          className="modal__input"
          id="recipe-name-id"
          placeholder="Recipe name"
          type="text"
          required
          name="recipe-name"
          //   value={data.email}
          //   onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Image
        <input
          className="modal__input"
          id="recipe-image-id"
          placeholder="Image URL"
          type="url"
          required
          name="recipe-image"
          //   value={data.password}
          //   onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Ingredients
        <button className="modal__button-add">+ Add ingredient</button>
      </label>
      <label className="modal__label">
        Steps
        <button className="modal__button-add">+ Add step</button>
      </label>
    </ModalWithForm>
  );
}

export default AddRecipeModal;
