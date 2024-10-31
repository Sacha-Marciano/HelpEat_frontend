import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddScheduleModal({ isOpen, onClose, favoriteRecipes, schedule }) {
  const _handleSubmit = (evt) => {
    evt.preventDefault();
  };
  return (
    <ModalWithForm
      title="Add to schedule"
      closePopup={onClose}
      isOpen={isOpen}
      onSubmit={_handleSubmit}
      buttonText="Save"
    >
      <label className="modal__label">
        Add on:
        <select className="modal__dropdown">
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
      </label>
      <label className="modal__label">
        For :
        <select className="modal__dropdown">
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
      </label>
      <label className="modal__label">
        Recipe :
        <select className="modal__dropdown">
          {favoriteRecipes.map((item) => {
            return (
              <option key={item._id} value={item.name}>
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
