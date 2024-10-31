import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SearchModal({ isOpen, onClose }) {
  const _handleSubmit = (evt) => {
    evt.preventDefault();
  };
  return (
    <ModalWithForm
      title="Search"
      closePopup={onClose}
      isOpen={isOpen}
      onSubmit={_handleSubmit}
      buttonText="Search"
    >
      <label className="modal__label">
        Name of the recipe*
        <input
          className="modal__input"
          id="recipe-search-id"
          placeholder="Search recipe"
          type="text"
          required
          name="recipe-search"
          //   value={data.email}
          //   onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default SearchModal;
