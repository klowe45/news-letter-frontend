import "./ModalWithForm.css";

function ModalWithForm({
  closeModal,
  titleText,
  isOpen,
  onSubmit,
  buttonText,
  buttonOther,
  orText,
  toggleModal,
  isSubmitDisabled = false,
  children,
  hiddenSubmitButton = false, // Fixed default value
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button className="modal__close" onClick={closeModal} type="button" />
        <form className="modal__form" onSubmit={onSubmit}>
          <h2 className="modal__title">{titleText}</h2>

          {children}

          <div className="modal__buttons">
            {!hiddenSubmitButton && (
              <button
                className={`modal__button-submit${
                  isSubmitDisabled ? " modal__button-submit-disabled" : ""
                }`}
                type="submit"
                disabled={isSubmitDisabled}
              >
                {buttonText}
              </button>
            )}

            <div
              className={`modal__other-button ${
                hiddenSubmitButton ? "modal__other-button-left" : ""
              }`}
            >
              <button
                type="button"
                className="modal__button-other"
                onClick={toggleModal}
              >
                <span className="modal__or-text">{orText}</span> {buttonOther}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
