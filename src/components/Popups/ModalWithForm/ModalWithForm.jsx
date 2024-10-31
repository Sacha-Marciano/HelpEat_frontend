import { useRef } from "react";

import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  closePopup,
  isOpen,
  onSubmit,
  buttonText,
  alternateOptionText,
  alternateOptionHandler,
  validationError,
}) {
  const formRef = useRef();

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <p className="modal__title">{title}</p>
        <button
          className="modal__button_type_close"
          type="button"
          onClick={closePopup}
        />

        <form className="modal__form" onSubmit={onSubmit} ref={formRef}>
          {children}
          {validationError ? (
            <span className="modal__form_error-span">
              Wrong email or password
            </span>
          ) : (
            " "
          )}
          <div className="modal__button-container">
            <button type="submit" className="modal__button_type_submit">
              {buttonText}
            </button>
            {alternateOptionText ? (
              <button
                type="button"
                className="modal__button-alternate"
                onClick={alternateOptionHandler}
              >
                {alternateOptionText}
              </button>
            ) : (
              " "
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
