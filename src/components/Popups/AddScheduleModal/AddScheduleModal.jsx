import { useState, useEffect } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddScheduleModal({
  isOpen,
  onClose,
  onSubmit,
  favoriteRecipes,
  schedule,
  selectedScheduleCard,
}) {
  const [validationError, setValidationError] = useState(false);
  const [data, setData] = useState({
    day: 0,
    time: "breakfast",
    recipeId: 0,
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const _handleSubmit = (evt) => {
    evt.preventDefault();
    if (data.recipeId === 0) {
      setValidationError(true);
    } else {
      onSubmit(data);
      setValidationError(false);
    }
  };

  useEffect(() => {
    if (favoriteRecipes.length > 0) {
      setData((prevData) => ({
        ...prevData,
        recipeId: favoriteRecipes[0]._id,
      }));
    }
  }, [favoriteRecipes]);

  useEffect(() => {
    if (selectedScheduleCard !== "") {
      setData((prevData) => ({
        ...prevData,
        day: selectedScheduleCard.dayIndex,
      }));
    }
  }, [selectedScheduleCard]);

  return (
    <ModalWithForm
      title="Add to schedule"
      closePopup={onClose}
      isOpen={isOpen}
      onSubmit={_handleSubmit}
      buttonText="Save"
      validationError={validationError}
      validationErrorText="Please add a recipe to your favorites to schedule it"
    >
      <label className="modal__label">
        Add on:
        <select
          className="modal__dropdown"
          onChange={handleChange}
          value={data.dayIndex}
          name="day"
        >
          <option key={"default"} value={selectedScheduleCard.dayIndex}>
            {selectedScheduleCard.day}
          </option>
          {schedule.map((day) => {
            return (
              <option key={day._id} value={day.dayIndex}>
                {day.day}
              </option>
            );
          })}
        </select>
      </label>
      <label className="modal__label">
        For :
        <select
          className="modal__dropdown"
          onChange={handleChange}
          value={data.time}
          name="time"
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
      </label>
      <label className="modal__label">
        Recipe :
        <select
          className="modal__dropdown"
          onChange={handleChange}
          value={data.recipeId}
          name="recipeId"
        >
          {favoriteRecipes.map((item) => {
            return (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </label>
    </ModalWithForm>
  );
}

export default AddScheduleModal;
