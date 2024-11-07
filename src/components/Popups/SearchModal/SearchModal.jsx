import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SearchModal({
  isOpen,
  onClose,
  onSearch,
  validationError,
  setValidationError,
}) {
  const [data, setData] = useState({ recipeSearch: "" });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setValidationError(false);
  };

  const _handleSubmit = (evt) => {
    evt.preventDefault();
    onSearch(data);
  };
  return (
    <ModalWithForm
      title="Search"
      closePopup={onClose}
      isOpen={isOpen}
      onSubmit={_handleSubmit}
      buttonText="Search"
      validationError={validationError}
      validationErrorText={`No recipe contains the name "${data.recipeSearch}"`}
    >
      <label className="modal__label">
        Name of the recipe*
        <input
          className="modal__input"
          id="recipe-search-id"
          placeholder="Search recipe"
          type="text"
          required
          name="recipeSearch"
          value={data.recipeSearch}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default SearchModal;
