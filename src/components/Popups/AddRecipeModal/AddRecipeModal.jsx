import { useState } from "react";

import "./AddRecipeModal.css";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddRecipeModal({ isOpen, onClose, onSubmit }) {
  const [measures, setMeasures] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  // const [image, setImage] = useState(null);

  const [data, setData] = useState({
    recipeName: "",
    recipeImage: "",
    recipeIngredients: "",
    recipeMeasures: "",
    recipeSteps: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleImageUpload = (evt) => {
  //   const file = evt.target.files[0];
  //   const imageURL = URL.createObjectURL(file);
  //   setImage(imageURL);
  // };

  const handleAddIngredient = (evt) => {
    evt.preventDefault();
    setMeasures([data.recipeMeasures, ...measures]);
    setIngredients([data.recipeIngredients, ...ingredients]);
    setData((prevData) => ({
      ...prevData,
      recipeMeasures: "",
      recipeIngredients: "",
    }));
  };

  const handleAddStep = (evt) => {
    evt.preventDefault();
    setSteps([data.recipeSteps, ...steps]);
    setData((prevData) => ({
      ...prevData,
      recipeSteps: "",
    }));
  };

  const _handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit({
      _id: `${Math.random()}`,
      name: data.recipeName,
      image: data.recipeImage,
      ingredients: ingredients,
      measures: measures,
      instructions: steps,
      isFavorite: true,
    });
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
          name="recipeName"
          value={data.recipeName}
          onChange={handleChange}
        />
      </label>
      {/* <label className="modal__label">
        Image*
        <label htmlFor="file-upload-id" className="modal__label-upload">
          Choose File
        </label>
        <input
          className="modal__input modal__input-upload"
          id="file-upload-id"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </label> */}
      <label className="modal__label">
        Image*
        <input
          className="modal__input"
          id="image"
          placeholder="Image URL"
          type="url"
          required
          name="image"
          value={data.recipeImage}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Ingredients
        <button className="modal__button-add" onClick={handleAddIngredient}>
          + Add ingredient
        </button>
        <fieldset className="modal__fieldset-ingredients">
          <input
            className="modal__input"
            id="recipe-measures-id"
            placeholder="Measure"
            type="text"
            name="recipeMeasures"
            value={data.recipeMeasures}
            onChange={handleChange}
          />
          <input
            className="modal__input"
            id="recipe-ingredients-id"
            placeholder="Ingredient"
            type="text"
            name="recipeIngredients"
            value={data.recipeIngredients}
            onChange={handleChange}
          />
        </fieldset>
      </label>
      <ul className="modal__ingredient-list">
        {ingredients.length > 0
          ? ingredients.map((item, index) => {
              return (
                <li key={index} className="modal__ingredient-item">
                  {measures[index]} {item}
                </li>
              );
            })
          : " "}
      </ul>

      <label className="modal__label">
        Steps
        <button className="modal__button-add" onClick={handleAddStep}>
          + Add step
        </button>
        <input
          className="modal__input"
          id="recipe-steps-id"
          placeholder="Step"
          type="text"
          name="recipeSteps"
          value={data.recipeSteps}
          onChange={handleChange}
        />
      </label>
      <ul className="modal__step-list">
        {steps.length > 0
          ? steps.map((item, index) => {
              return (
                <li key={index} className="modal__step-item">
                  {item}
                </li>
              );
            })
          : " "}
      </ul>
    </ModalWithForm>
  );
}

export default AddRecipeModal;
